<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1;

use Composer\Semver\Comparator;
use DateTimeInterface;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\AppVersions\FileNotFoundException;
use Pronto\MobileBundle\Exceptions\AppVersions\NotFoundException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationHeaderException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidPluginStateException;
use Pronto\MobileBundle\Service\FileManager;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class AppVersionController extends BaseApiController
{
    /**
     * @throws ApiException
     */
    public function getAction(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization($this->getPluginIdentifier());

        /** @var AppVersion $version */
        $version = $entityManager->getRepository(AppVersion::class)->findOneBy([
            'id'          => $id,
            'application' => $this->prontoMobile->getApplication()
        ]);

        if ($version === null) {
            throw new NotFoundException();
        }

        return $this->successResponse($this->serializer->serialize($version, [new DateTimeNormalizer()]));
    }

    /**
     * API-docs: Register a new user
     *
     * @api {get} /v1/versions/app/{id} Get a specific app version
     * @apiName GetAppVersion
     * @apiGroup AppVersion
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     * @apiUse InvalidParameters
     * @apiUse AuthorizationErrors
     */

    public function getPluginIdentifier(): string
    {
        return Plugin::APP_VERSIONS;
    }

    /**
     * API-docs: Register a new user
     *
     * @api {get} /v1/versions/app/{id}/file Download a new version of the app
     * @apiName DownloadAppVersion
     * @apiGroup AppVersion
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     * @apiUse InvalidParameters
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws ApiException
     */
    public function downloadAction(EntityManagerInterface $entityManager, FileManager $fileManager, int $id): BinaryFileResponse
    {
        // Validate the authorization
        $this->validateAuthorization($this->getPluginIdentifier());

        /** @var AppVersion $version */
        $version = $entityManager->getRepository(AppVersion::class)->findOneBy([
            'id'          => $id,
            'application' => $this->prontoMobile->getApplication()
        ]);

        if ($version === null) {
            throw new NotFoundException();
        }

        $file = $fileManager->get(FileManager::APP_VERSIONS_DIRECTORY . '/' . $version->getFileName());

        if ($file === null) {
            throw new FileNotFoundException();
        }

        return new BinaryFileResponse($file->getRealPath());
    }

    /**
     * API-docs: Check for available app updates
     *
     * @api {get} /v1/versions/app Check for available app updates
     * @apiName AppVersionCheck
     * @apiGroup AppVersion
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     * @apiUse InvalidParameters
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws InvalidAuthorizationHeaderException
     * @throws InvalidAuthorizationTokenException
     * @throws InvalidPluginStateException
     * @throws NotFoundException
     */
    public function availableUpdateAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization($this->getPluginIdentifier());

        $versions = $entityManager->getRepository(AppVersion::class)->findBy([
            'application' => $this->prontoMobile->getApplication()
        ]);

        // Determine which versions are new
        $versions = array_reduce($versions, function ($result, AppVersion $version) {
            try {
                $greaterThen = Comparator::greaterThan($version->getVersion(), $_GET['version']);
            }  catch (Exception) {
                $greaterThen = true;
            }

            if ($greaterThen) {
                $result[] = [
                    'id'           => (int)$version->getId(),
                    'version'      => $version->getVersion(),
                    'required'     => $version->isRequired(),
                    'description'  => $version->getDescription(),
                    'url'          => $version->getUrl() ?? $this->generateUrl('app_version_file', [
                            'id' => $version->getId(),
                        ], UrlGeneratorInterface::ABSOLUTE_URL),
                    'release_date' => $version->getReleaseDate(),
                    'created_at'   => $version->getCreatedAt()->format(DateTimeInterface::ATOM),
                    'updated_at'   => $version->getUpdatedAt()->format(DateTimeInterface::ATOM)
                ];
            }

            return $result;
        }, []);

        // Sort the versions
        usort($versions, function ($first, $second) {
            if (Comparator::equalTo($first['version'], $second['version'])) {
                return 0;
            }

            if (Comparator::greaterThan($first['version'], $second['version'])) {
                return -1;
            }

            return 1;
        });

        if (count($versions) === 0) {
            return new JsonResponse([
                'error' => [
                    'code'    => 404,
                    'message' => 'No new versions available'
                ]
            ], 404);
        }

        // Don't wrap it inside a "data" object
        if (strpos($request->getPathInfo(), 'versions.php') !== false) {
            return new JsonResponse($versions[0]);
        }

        return $this->successResponse($versions[0]);
    }
}
