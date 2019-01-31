<?php

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Service\JsonSerializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class DeviceController extends BaseApiController
{

	/**
	 * API-docs: Register a new device
	 *
	 * @api {post} /v1/devices/registration Register a device
	 * @apiName RegisterDevice
	 * @apiGroup Device
	 * @apiVersion 1.0.0
	 *
	 * @apiUse OAuthAuthorizationHeader
	 *
	 * @apiParam {String} [firebase_token]  Firebase token for Android devices.
	 * @apiParam {String} [apns_token]      APNS token for iOS devices.
	 * @apiParam {String} name              Name of the device.
	 * @apiParam {String} model             Model of the device.
	 * @apiParam {String} manufacturer      Manufacturer of the device.
	 * @apiParam {String} platform          Platform of the device.
	 * @apiParam {String} app_version       Version of app.
	 * @apiParam {String} os_version        OS version.
	 * @apiParam {String} language          Language of device.
	 * @apiParam {Object} [extra_data]      Extra meta data.
	 * @apiParam {Object} [user_identifier] Optional user identifier.
	 *
	 * @apiParamExample {json} Content:
	 *     {
	 *       "firebase_token": "d7zgIyAXz_E:APA91bF2arcF8QMeeUHH32WBH8wKBJVTyr9WFnIL8BYJP_f6B9_Qn0ZY1zfVoyaelCAKjdsKz09UNbGxe0QcGARmU-pqeilNqKqRh",
	 *       "apns_token": "59CF77D83300612895C8EAEFE51B443B4017F4303",
	 *       "name": "iPhone off John",
	 *       "model": "iPhone 5s",
	 *       "manufacturer": "Apple",
	 *       "platform": "ios",
	 *       "app_version": "1.0.0",
	 *       "os_version": "11.2.1",
	 *       "language": "NL",
	 *       "extra_data": {
	 *         "email": "johndoe@example.com",
	 *         "password": "thisisasecretpassword"
	 *       },
	 *       "user_identifier": "zC9WahWKVTcdG5BfLfHPU9"
	 *     }
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "data": {
	 *         "identifier": "zC9WahWKVTcdG5BfLfHPU9",
	 *         "app_user": null,
	 *         "firebase_token": "d7zgIyAXz_E:APA91bF2arcF8QMeeUHH32WBH8wKBJVTyr9WFnIL8BYJP_f6B9_Qn0ZY1zfVoyaelCAKjdsKz09UNbGxe0QcGARmU-pqeilNqKqRh",
	 *         "apns_token": "59CF77D83300612895C8EAEFE51B443B4017F4303",
	 *         ...
	 *       }
	 *     }
	 *
	 * @apiError DeviceAlreadyRegistered      This device is already registered
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 422 DeviceAlreadyRegistered
	 *     {
	 *       "error": {
	 *         "code": 422,
	 *         "message": "This device is already registered"
	 *       }
	 *     }
	 *
	 * @apiUse InvalidParameters
	 * @apiUse AuthorizationErrors
	 */

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function registerAction(Request $request, EntityManagerInterface $entityManager)
	{
		// Validate the authorization
		$this->validateAuthorization();

		// Validate the body
		$this->validateRequestContent($request, ['name', 'model', 'manufacturer', 'platform', 'os_version', 'app_version', 'language']);

		// Retrieve the content from the request
		$content = json_decode($request->getContent());

		// Check if either the firebase or apns token is present
		if ((!isset($content->firebase_token) || empty($content->firebase_token)) && (!isset($content->apns_token) || empty($content->apns_token))) {
			$this->invalidParametersResponse(Device::MISSING_APNS_OR_FIREBASE_TOKEN);
		}

		/** @var Application $application */
		$application = $this->prontoMobile->getApplication();

		if (isset($content->firebase_token) && !empty($content->firebase_token)) {
			/** @var Device $device */
			$device = $entityManager->getRepository(Device::class)->findOneBy([
				'firebaseToken' => $content->firebase_token,
				'application'   => $application
			]);
		} else {
			/** @var Device $device */
			$device = $entityManager->getRepository(Device::class)->findOneBy([
				'apnsToken'   => $content->apns_token,
				'application' => $application
			]);
		}

		if ($device !== null) {
			if ($device->getTokenState()) {
				$this->customErrorResponse(Device::DEVICE_ALREADY_REGISTERED, $this->serializer->serialize($device, [new DateTimeNormalizer()]));
			} else {

				// If the token state was false, re-register the device and return it
				$device->setTokenState(true);
				$device->setPushNotifications(true);

				// Attach the app user when it's provided
				if (isset($content->user_identifier)) {
					$appUser = $entityManager->getRepository(AppUser::class)->findOneBy([
						'id'          => $content->user_identifier,
						'application' => $application
					]);

					if ($appUser !== null) {
						$device->setAppUser($appUser);
					}
				}

				$entityManager->persist($device);
				$entityManager->flush();

				return $this->successResponse($this->serializer->serialize($device, [new DateTimeNormalizer()]), 'The devices\' registration is refreshed');
			}
		}

		$device = new Device();
		$device->setApplication($this->prontoMobile->getApplication());

		if (strtolower($content->platform) === 'ios') {
			$device->setApnsToken($content->apns_token);
		} else {
			$device->setFirebaseToken($content->firebase_token);
		}

		// Attach the app user when it's provided
		if (isset($content->user_identifier)) {
			$appUser = $entityManager->getRepository(AppUser::class)->findOneBy([
				'id'          => $content->user_identifier,
				'application' => $application
			]);

			if ($appUser !== null) {
				$device->setAppUser($appUser);
			}
		}

		$device->setName($content->name);
		$device->setModel($content->model);
		$device->setManufacturer($content->manufacturer);
		$device->setPlatform(strtolower($content->platform));
		$device->setOsVersion($content->os_version);
		$device->setAppVersion($content->app_version);
		$device->setLanguage($content->language);
		$device->setLastLogin(new \DateTime());

		// Save additional data
		if (isset($content->extra_data)) {
			$device->setExtraData($content->extra_data);
		}

		$entityManager->persist($device);
		$entityManager->flush();

		return $this->successResponse($this->serializer->serialize($device, [new DateTimeNormalizer()]));
	}


	/**
	 * Deregister a device
	 *
	 * @api {delete} /v1/devices/registration/{deviceIdentifier} Deregister a device
	 * @apiName DeregisterDevice
	 * @apiGroup Device
	 * @apiVersion 1.0.0
	 *
	 * @apiParam {String} deviceIdentifier Identifier of the device
	 * @apiUse OAuthAuthorizationHeader
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "message": "The devices registration is removed"
	 *     }
	 *
	 * @apiUse ObjectNotFound
	 * @apiUse AuthorizationErrors
	 */

	/**
	 * @param EntityManagerInterface $entityManager
	 * @param $deviceIdentifier
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function deregisterAction(EntityManagerInterface $entityManager, $deviceIdentifier)
	{
		$this->validateAuthorization();

		/** @var Device $device */
		$device = $entityManager->getRepository(Device::class)->find($deviceIdentifier);

		if ($device === null) {
			$this->objectNotFoundResponse(Device::class);
		}

		// Disable all services on this device
		$device->setPushNotifications(false);
		$device->setTokenState(false);

		// Detach the user from this device
		$device->setAppUser(null);

		$entityManager->persist($device);
		$entityManager->flush();

		return $this->successResponse(null, 'The devices registration is removed');
	}
}