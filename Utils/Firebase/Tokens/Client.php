<?php

namespace Pronto\MobileBundle\Utils\Firebase\Tokens;


use Exception;
use Pronto\MobileBundle\Utils\Guzzle\BaseClient;
use Psr\Http\Message\ResponseInterface;
use stdClass;

class Client extends BaseClient
{
	/**
	 * Client constructor.
	 * @param string $serverKey
	 */
	public function __construct(string $serverKey)
	{
		// Set the base url
		$this->setBaseUrl('https://iid.googleapis.com/iid/v1:batchImport');

		// Set the authorization header
		$this->setHeaders([
			'Authorization' => 'key=' . $serverKey
		]);

		if (empty($serverKey)) {
			throw new \InvalidArgumentException('Invalid FCM server key.');
		}
	}


	/**
	 * Parse the response
	 *
	 * @param ResponseInterface $response
	 * @return ResponseInterface|stdClass
	 */
	public function parseResponse(ResponseInterface $response): ResponseInterface
	{
		try {
			return json_decode($response->getBody()->getContents());
		} catch(Exception $exception) {
			return $response;
		}
	}
}