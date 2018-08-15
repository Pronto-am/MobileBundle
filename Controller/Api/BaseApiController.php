<?php

namespace Pronto\MobileBundle\Controller\Api;

use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\RequestBodyValidator;
use Pronto\MobileBundle\Traits\JsonResponseGenerators;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class BaseApiController extends Controller
{

	use JsonResponseGenerators;


	/**
	 * API-docs: Basic authorization header block
	 *
	 * @apiDefine BasicAuthorizationHeader
	 *
	 * @apiHeader {String} Authorization Pronto CMS Authorization token
	 * @apiHeaderExample {json} Header-Example:
	 *     {
	 *       "Authorization": "Basic [token]"
	 *     }
	 */

	/**
	 * API-docs: Bearer authorization header block
	 *
	 * @apiDefine OAuthAuthorizationHeader
	 *
	 * @apiHeader {String} Authorization Pronto CMS OAuth access token
	 * @apiHeaderExample {json} Header-Example:
	 *     {
	 *       "Authorization": "Bearer [access_token]"
	 *     }
	 */

	/**
	 * API-docs: Object not found response
	 *
	 * @apiDefine ObjectNotFound
	 *
	 * @apiError ObjectNotFound The object could not be found
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 X04 ObjectNotFound
	 *     {
	 *       "error": {
	 *         "code": "404",
	 *         "message": "[object] not found"
	 *       }
	 *     }
	 */

	/**
	 * API-docs: Validate the body of a post request
	 *
	 * @apiDefine InvalidParameters
	 *
	 * @apiError InvalidParameters Not all of the required parameters are present
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 422 InvalidParameters
	 *     {
	 *       "error": {
	 *         "code": 422,
	 *         "message": "Not all required keys are present, please provide: manufacturer"
	 *       }
	 *     }
	 */

	/**
	 * API-docs: Validate oauth authorization
	 *
	 * @apiDefine OAuthAuthorizationErrors
	 *
	 * @apiError InvalidAccessToken        The access token provided is invalid.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 401 InvalidAccessToken
	 *     {
	 *       "error": "invalid_grant",
	 *       "message": "The access token provided is invalid."
	 *     }
	 */

	/**
	 * API-docs: Not authorized error
	 *
	 * @apiDefine NotAuthorized
	 *
	 * @apiError NotAuthorized        You are not authorized to perform this request
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 401 NotAuthorized
	 *     {
	 *       "error": {
	 *         "code": 401,
	 *         "message": "You are not authorized to perform this request"
	 *       }
	 *     }
	 */

	/**
	 * @param Request $request
	 * @param array $required
	 * @return bool|\Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function validateRequestContent(Request $request, array $required = [])
	{
		/** @var RequestBodyValidator $requestValidator */
		$requestValidator = $this->get('pronto_mobile.global.request_body_validator');

		// Validate the required parameters
		if (!$requestValidator->isValid($request, $required)) {
			$this->invalidParametersResponse($requestValidator->getMessage());
		}

		return true;
	}


	/**
	 * API-docs: Validate authorization
	 *
	 * @apiDefine AuthorizationErrors
	 *
	 * @apiError NoAuthorizationHeader        No authorization header present
	 * @apiError InvalidAuthorizationHeader   Client id and secret could not be parsed from the authorization header
	 * @apiError InvalidAuthorizationToken    Invalid authorization token
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 403 NoAuthorizationHeader
	 *     {
	 *       "error": {
	 *         "code": 403,
	 *         "message": "No authorization header present"
	 *       }
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 403 InvalidAuthorizationHeader
	 *     {
	 *       "error": {
	 *         "code": 403,
	 *         "message": "Client id and secret could not be parsed from the authorization header"
	 *       }
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 403 InvalidAuthorizationToken
	 *     {
	 *       "error": {
	 *         "code": 403,
	 *         "message": "Invalid authorization token"
	 *       }
	 *     }
	 */

	/**
	 * @param Request $request
	 * @param string|null $pluginIdentifier
	 * @return void
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function validateAuthorization(Request $request, string $pluginIdentifier = null): void
	{
		if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
			$this->accessDeniedResponse(ErrorResponse::NO_AUTHORIZATION_HEADER);
		}

		/** @var TokenStorage $tokenStorage */
		$tokenStorage = $this->get('security.token_storage');

		$entityManager = $this->getDoctrine()->getManager();

		/** @var AccessToken $accessToken */
		$accessToken = $entityManager->getRepository(AccessToken::class)->findOneBy([
			'token' => $tokenStorage->getToken()->getCredentials()
		]);

		/** @var Application $application */
		$application = $accessToken->getClient();

		// Check if the application exists
		if ($application === null) {
			$this->accessDeniedResponse(ErrorResponse::INVALID_AUTHORIZATION_TOKEN);
		}

		// Check if the plugin is active
		if ($pluginIdentifier !== null && !$this->validatePluginState($application, $pluginIdentifier)) {
			$this->accessDeniedResponse(ErrorResponse::INVALID_PLUGIN_STATE);
		}

		// Save the application for later use
		$prontoMobile = $this->get('pronto_mobile.global.app');
		$prontoMobile->setApplication($application);
	}


	/**
	 * Validate the state of a plugin
	 *
	 * @param Application $application
	 * @param string $identifier
	 * @return bool
	 */
	private function validatePluginState(Application $application, string $identifier): bool
	{
		$entityManager = $this->getDoctrine()->getManager();

		/** @var Plugin $plugin */
		$plugin = $entityManager->getRepository(Plugin::class)->findOneBy([
			'identifier' => $identifier
		]);

		/** @var ApplicationPlugin $applicationPlugin */
		$applicationPlugin = $entityManager->getRepository(ApplicationPlugin::class)->findOneBy([
			'plugin'      => $plugin,
			'application' => $application,
			'active'      => true
		]);

		return $applicationPlugin !== null;
	}
}