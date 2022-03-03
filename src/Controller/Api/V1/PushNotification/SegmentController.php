<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1\PushNotification;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Device\DeviceSegment;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationHeaderException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidPluginStateException;
use Pronto\MobileBundle\Exceptions\Devices\NotFoundException;
use Pronto\MobileBundle\Exceptions\PushNotifications\InvalidSegmentException;
use Pronto\MobileBundle\Exceptions\PushNotifications\Segments\NotFoundException as SegmentNotFoundException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SegmentController extends BaseApiController
{

    /**
     * Get the notification segments and the devices' subscribed status
     *
     * @api {get} /v1/notifications/segments/{deviceIdentifier} Retrieve the segments
     * @apiName GetNotificationSegments
     * @apiGroup NotificationSegments
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
     *           "name": {
     *             "nl": "Segment een",
     *             "en": "Segment one"
     *           },
     *           "subscribed": false
     *         }
     *       ]
     *     }
     *
     * @apiUse ObjectNotFound
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws NotFoundException
     * @throws InvalidAuthorizationHeaderException
     * @throws InvalidAuthorizationTokenException
     * @throws InvalidPluginStateException
     */
    public function subscribedAction(EntityManagerInterface $entityManager, $deviceIdentifier): JsonResponse
    {
        $this->validateAuthorization();

        /** @var Device $device */
        $device = $entityManager->getRepository(Device::class)->find($deviceIdentifier);

        // Check if the application exists
        if ($device === null) {
            throw new NotFoundException();
        }

        $segments = $entityManager->getRepository(Segment::class)->getWithSubscribedStatus($device);

        // Cast the integers to booleans and string to integers
        foreach ($segments as &$segment) {
            $segment['id'] = (int) $segment['id'];
            $segment['subscribed'] = (bool) $segment['subscribed'];
            $segment['name'] = json_decode($segment['name']);
        }

        return $this->successResponse($segments);
    }


    /**
     * Save the subscribed status of a device and the segments
     *
     * @api {put} /v1/notifications/segments Update the segments of a device
     * @apiName PutNotificationSegments
     * @apiGroup NotificationSegments
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} language          Language of device.
     * @apiParam {Object} [extra_data]      Extra meta data.
     *
     * @apiParamExample {json} Content:
     *     {
     *       "device_identifier": "d7zgIyAXz_E:APA91bF2arcF8QMee",
     *       "segments": [
     *         {
     *           "id": 1
     *           "subscribed": true
     *         }
     *       ]
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Segments of device are updated"
     *     }
     *
     * @apiUse InvalidParameters
     * @apiUse ObjectNotFound
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws ApiException
     * @throws InvalidAuthorizationHeaderException
     * @throws InvalidAuthorizationTokenException
     * @throws InvalidPluginStateException
     * @throws InvalidSegmentException
     * @throws NotFoundException
     * @throws SegmentNotFoundException
     */
    public function updateAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization();

        // Validate the request body
        $this->validateRequestContent($request, ['device_identifier', 'segments']);

        // Check if the segments property is an array
        if (!is_array($request->request->get('segments'))) {
            throw new InvalidSegmentException();
        }

        /** @var Device $device */
        $device = $entityManager->getRepository(Device::class)->find($request->request->get('device_identifier'));

        // Check if the application exists
        if ($device === null) {
            throw new NotFoundException();
        }

        // Update the segments for the device
        foreach ($request->request->get('segments') as $segment) {
            /** @var DeviceSegment $deviceSegment */
            $deviceSegment = $entityManager->getRepository(DeviceSegment::class)->findOneBy([
                'segment' => $segment['id'],
                'device'  => $request->request->get('device_identifier')
            ]);

            // check if the user subscribed to the segment
            if ($segment['subscribed']) {
                // If subscribed and not present, add it
                if ($deviceSegment === null) {
                    /** @var Segment $pushNotificationSegment */
                    $pushNotificationSegment = $entityManager->getRepository(Segment::class)->find($segment['id']);

                    // Check if the segment exists
                    if ($pushNotificationSegment === null) {
                        throw new SegmentNotFoundException();
                    }

                    $deviceSegment = new DeviceSegment($pushNotificationSegment, $device);

                    $entityManager->persist($deviceSegment);
                }
            } else {
                // If subscribed and present, delete it
                if ($deviceSegment !== null) {
                    $entityManager->remove($deviceSegment);
                }
            }
        }

        // Execute all queries
        $entityManager->flush();

        return $this->successResponse(null, 'Segments of the device are updated');
    }
}
