<?php

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\FileManager;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class AppVersionController extends BaseApiController
{
	/**
	 * Get the plugin identifier
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::APP_VERSIONS;
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

    /**
     * @param EntityManagerInterface $entityManager
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Pronto\MobileBundle\Exception\ApiException
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
            $this->objectNotFoundResponse(AppVersion::class);
        }

        return $this->successResponse($this->serializer->serialize($version, [new DateTimeNormalizer()]));
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
     * @param EntityManagerInterface $entityManager
     * @param FileManager $fileManager
     * @param int $id
     * @return BinaryFileResponse
     * @throws \Pronto\MobileBundle\Exception\ApiException
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
            $this->objectNotFoundResponse(AppVersion::class);
        }

        $file = $fileManager->get(FileManager::APP_VERSIONS_DIRECTORY . '/' . $version->getFileName());

        if($file === null) {
            $this->customErrorResponse(AppVersion::FILE_NOT_FOUND, AppVersion::class);
        }

        return new BinaryFileResponse($file->getRealPath());
    }
}
