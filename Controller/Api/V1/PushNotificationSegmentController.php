<?php

namespace Pronto\MobileBundle\Controller\Api\V1;

use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Device\DeviceSegment;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Symfony\Component\HttpFoundation\Request;

class PushNotificationSegmentController extends BaseApiController
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
	 * @apiUse BasicAuthorizationHeader
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
	 * @param Request $request
	 * @param $deviceIdentifier
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function subscribedAction(Request $request, $deviceIdentifier)
	{
		$this->validateAuthorization($request);

		$entityManager = $this->getDoctrine()->getManager();

		// Get the device by it's id
		$device = $entityManager->getRepository(Device::class)->find($deviceIdentifier);

		// Check if the application exists
		if ($device === null) {
			$this->objectNotFoundResponse(Device::class);
		}

		$segments = $entityManager->getRepository(Segment::class)->getWithSubscribedStatus($device);

		// Cast the integers to booleans and string to integers
		foreach ($segments as &$segment) {
			$segment['id'] = (int)$segment['id'];
			$segment['subscribed'] = (bool)$segment['subscribed'];
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
	 * @apiUse BasicAuthorizationHeader
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

	/** @param Request $request
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function updateAction(Request $request)
	{
		// Validate the authorization
		$this->validateAuthorization($request);

		// Validate the request body
		$this->validateRequestContent($request, ['device_identifier', 'segments']);

		$content = json_decode($request->getContent());

		// Check if the segments property is an array
		if (!is_array($content->segments)) {
			$this->invalidParametersResponse(Segment::INVALID_SEGMENT_PARAMETER, Segment::class);
		}

		$entityManager = $this->getDoctrine()->getManager();

		/** @var Device $device */
		$device = $entityManager->getRepository(Device::class)->find($content->device_identifier);

		// Check if the application exists
		if ($device === null) {
			$this->objectNotFoundResponse(Device::class);
		}

		// Update the segments for the device
		foreach ($content->segments as $segment) {
			/** @var DeviceSegment $deviceSegment */
			$deviceSegment = $entityManager->getRepository(DeviceSegment::class)->findOneBy([
				'segment' => $segment->id,
				'device'  => $content->device_identifier
			]);

			// check if the user subscribed to the segment
			if ($segment->subscribed) {
				// If subscribed and not present, add it
				if ($deviceSegment === null) {
					/** @var Segment $pushNotificationSegment */
					$pushNotificationSegment = $entityManager->getRepository(Segment::class)->find($segment->id);

					// Check if the segment exists
					if ($pushNotificationSegment === null) {
						$this->objectNotFoundResponse(Segment::class);
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