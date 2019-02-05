<?php

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\TranslationKey;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class TranslationController extends BaseApiController
{

	/**
	 * API-docs: Retrieve the translations of this app
	 *
	 * @api {get} /v1/translations Retrieve the translations
	 * @apiName RetrieveTranslations
	 * @apiGroup Translation
	 * @apiVersion 1.0.0
	 *
	 * @apiUse OAuthAuthorizationHeader
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
	 * @apiUse InvalidParameters
	 * @apiUse AuthorizationErrors
	 */

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function indexAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
	{
		// Validate the authorization
		$this->validateAuthorization();

		$application = $this->prontoMobile->getApplication();

		$filters = [
			'application' => $application,
		];

		// Filter by platform when provided
		if ($request->query->has('platform')) {
			$platform = strtolower($request->query->get('platform'));

			if (in_array($platform, ['android', 'ios'], true)) {
				$filters[$platform] = true;
			}
		}

		$translations = $entityManager->getRepository(TranslationKey::class)->findBy($filters, [
			'identifier' => 'asc'
		]);

		return $this->successResponse($this->serializer->serialize($translations));
	}
}