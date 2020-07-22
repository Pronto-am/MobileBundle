<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Exceptions\ApiException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class PushNotificationController extends BaseApiController
{
    /**
     * Get the notifications, sent to a specific device token
     *
     * @api {get} /v1/notifications/{deviceIdentifier} Retrieve the segments
     * @apiName GetNotifications
     * @apiGroup Notifications
     * @apiVersion 1.0.0
     *
     * @apiParam {String} deviceIdentifier Identifier of the device
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": [
     *         {
     *           "id": 1,
     *           "sent_by": {
     *             "id": 2,
     *             "first_name": "User",
     *             "insertion": null,
     *             "last_name": "Name",
     *             "full_name": "Name",
     *             "created_at": "2019-03-08T14:54:22+00:00",
     *             "updated_at": "2019-03-08T14:54:22+00:00",
     *           },
     *           "segment": {
     *             "id": 2,
     *             "name": {
     *               "en": "Title"
     *             }
     *           },
     *           "title": {
     *             "en": "Title"
     *           },
     *           "content": {
     *             "en": "Content"
     *           },
     *           "click_action_url": {
     *             "en": ""
     *           },
     *           "click_action_html": {
     *             "en": ""
     *           },
     *           "sent": "2019-03-08T14:54:22+00:00",
     *           "test": false
     *         }
     *       ]
     *     }
     *
     * @apiUse ObjectNotFound
     * @apiUse AuthorizationErrors
     */

    /**
     * @param EntityManagerInterface $entityManager
     * @param $deviceIdentifier
     * @return JsonResponse
     * @throws ApiException
     * @throws DBALException
     */
    public function listAction(EntityManagerInterface $entityManager, string $deviceIdentifier)
    {
        $this->validateAuthorization();

        /** @var Device $device */
        $notifications = $entityManager->getRepository(PushNotification::class)
            ->findForDevice($deviceIdentifier, $this->prontoMobile->getApplication());

        return $this->successResponse($this->serializer->serialize($notifications, [new DateTimeNormalizer()]));
    }
}
