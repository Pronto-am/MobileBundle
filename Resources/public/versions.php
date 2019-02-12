<?php

header('Content-Type: application/json');

use Composer\Semver\Comparator;
use Doctrine\DBAL\Configuration;
use Doctrine\DBAL\DriverManager;
use Symfony\Component\Dotenv\Dotenv;

$projectRoot = getProjectRoot();

if ($projectRoot === null) {
	returnError(500, 'Internal server error');
}

// Go back to the root of the project
require $projectRoot . '/vendor/autoload.php';

// Validate used request method
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	header('HTTP/1.0 405 Method Not Allowed');
	exit;
}

if (!isset($_GET['version'], $_GET['platform'])) {
	header('HTTP/1.0 400 Bad Request');
	exit;
}

// The check is to ensure we don't use .env in production
(new Dotenv())->load($projectRoot . '/.env');

$accessToken = parseAuthorizationHeader();

// Validate the authorization header
if ($accessToken === null) {
	returnError(403, 'Unauthorized');
}

try {
	// Establish the connection with the database
	$connection = DriverManager::getConnection([
		'url' => getenv('DATABASE_URL')
	], new Configuration());
} catch (Exception $exception) {
	returnError($exception->getCode(), $exception->getMessage());
}

try {
	$versions = getVersions(getApplicationId());
} catch (Exception $exception) {
	returnError($exception->getCode(), $exception->getMessage());
}

// Determine which versions are new
$versions = array_reduce($versions, function ($result, $version) {
	if (Comparator::greaterThan($version['version'], $_GET['version'])) {
		$result[] = [
			'id'           => (int)$version['id'],
			'version'      => $version['version'],
			'required'     => (bool)$version['required'],
			'description'  => json_decode($version['description']),
			'url'          => $version['url'] ?? createUrl($version['id']),
			'release_date' => $version['release_date'],
			'created_at'   => (new DateTime($version['created_at']))->setTimezone(new DateTimeZone('Europe/Amsterdam'))->format(DateTimeInterface::ATOM),
			'updated_at'   => (new DateTime($version['updated_at']))->setTimezone(new DateTimeZone('Europe/Amsterdam'))->format(DateTimeInterface::ATOM)
		];
	}

	return $result;
}, []);

// Sort the versions
usort($versions, function($first, $second) {
	if(Comparator::equalTo($first['version'], $second['version'])) {
		return 0;
	}

	if (Comparator::greaterThan($first['version'], $second['version'])) {
		return -1;
	}

	return 1;
});

if(count($versions) === 0) {
	returnError(404, 'No new versions available');
}

echo json_encode($versions[0]);
exit;


/**
 * @return string|null
 */
function getProjectRoot(): ?string
{
	$root = null;
	$wentUp = 0;

	$directory = __DIR__ . '/..';

	do {
		if (file_exists($directory . '/composer.json')) {
			$root = $directory;
		} else {
			$directory .= '/..';
		}

		$wentUp++;
	} while ($root === null && $wentUp < 10);

	return $root;
}


/**
 * @return int
 * @throws \Doctrine\DBAL\DBALException
 */
function getApplicationId(): int
{
	global $connection, $accessToken;

	// Get the application
	$query = 'SELECT client_id FROM access_tokens WHERE token = ?';
	$statement = $connection->prepare($query);
	$statement->bindValue(1, $accessToken);
	$statement->execute();

	$result = $statement->fetch();

	if ($result === false) {
		returnError(403, 'Unauthorized');
	}

	return $result['client_id'];
}


/**
 * @param int $applicationId
 * @return array
 * @throws \Doctrine\DBAL\DBALException
 */
function getVersions(int $applicationId): array
{
	global $connection;

	// Get the application
	$query = 'SELECT * FROM app_versions WHERE application_id = :application_id AND release_date <= :now AND platform = :platform';
	$statement = $connection->prepare($query);
	$statement->bindValue('application_id', $applicationId);
	$statement->bindValue('now', date('Y-m-d'));
	$statement->bindValue('platform', $_GET['platform']);
	$statement->execute();

	$result = $statement->fetchAll();

	if ($result === false) {
		returnError(403, 'Unauthorized');
	}

	return $result;
}


/**
 * @param string $id
 * @return string
 */
function createUrl(string $id): string
{
	return 'https://' . $_SERVER['HTTP_HOST'] . '/api/v1/versions/app/' . $id;
}


/**
 * @param int $code
 * @param string $message
 */
function returnError(int $code, string $message): void
{
	header('HTTP/1.0 403 Unauthorized');

	$response = [
		'error' => [
			'code'    => $code,
			'message' => $message
		]
	];

	echo json_encode($response);
	exit;
}

/**
 * @return string|null
 */
function parseAuthorizationHeader(): ?string
{
	$header = $_SERVER['HTTP_AUTHORIZATION'];

	if ($header === null) {
		return $header;
	}

	return str_ireplace('bearer ', '', $header);
}