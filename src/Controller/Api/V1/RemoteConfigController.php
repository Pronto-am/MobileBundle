<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Middleware\AuthorizationMiddleware;
use Pronto\MobileBundle\Serializer\EnumNormalizer;
use Pronto\MobileBundle\Serializer\RemoteConfigNormalizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RemoteConfigController extends BaseApiController
{
    /**
     * API-docs: Retrieve remote configurations
     *
     * @api {get} /v1/config?platform=:platform Retrieve remote configuration
     * @apiName RetrieveRemoteConfiguration
     * @apiGroup RemoteConfig
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} [platform] The platform for which to retrieve configuration, "android", "ios", or empty for both
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": {
     *         "id": 1,
     *         "release_date": null,
     *         "identifier": "show_banners",
     *         "value": true,
     *         "type": "bool",
     *         ...
     *       }
     *     }
     *
     * @apiUse InvalidParameters
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws Exception
     */
    public function indexAction(
        // Middleware:
        AuthorizationMiddleware $authorizationMiddleware,
        // Injection:
        Request $request,
        EntityManagerInterface $entityManager): JsonResponse
    {

        $platform = $request->query->get('platform');
        $application = $this->prontoMobile->getApplication();

        // Filter by platform when provided
        if ($platform !== null) {
            $platform = strtolower($platform);
        }

        $remoteConfig = $entityManager->getRepository(RemoteConfig::class)->byPlatform($application, $platform, new DateTime());

        return $this->successResponse($this->serializer->serialize($remoteConfig, [
            new RemoteConfigNormalizer(),
            new EnumNormalizer(),
        ]));
    }
}
