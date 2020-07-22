<?php

namespace Pronto\MobileBundle\Controller\Api;

use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationHeaderException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidPluginStateException;
use Pronto\MobileBundle\Service\JsonSerializer;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\RequestBodyValidator;
use Pronto\MobileBundle\Traits\JsonResponseGenerators;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class BaseApiController extends AbstractController
{
    use JsonResponseGenerators;

    /**
     * @var ProntoMobile $prontoMobile
     */
    protected $prontoMobile;

    /**
     * @var RequestBodyValidator $requestValidator
     */
    protected $requestValidator;

    /**
     * @var JsonSerializer $serializer
     */
    protected $serializer;

    public function __construct(ProntoMobile $prontoMobile)
    {
        $this->prontoMobile = $prontoMobile;
    }

    /**
     * @required
     * @param RequestBodyValidator $requestValidator
     */
    public function setRequestBodyValidator(RequestBodyValidator $requestValidator): void
    {
        $this->requestValidator = $requestValidator;
    }

    /**
     * @required
     * @param JsonSerializer $serializer
     */
    public function setJsonSerializer(JsonSerializer $serializer): void
    {
        $this->serializer = $serializer;
    }

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
     * @throws ApiException
     */
    public function validateRequestContent(Request $request, array $required = [])
    {
        // Validate the required parameters
        if (! $this->requestValidator->isValid($request, $required)) {
            $this->invalidParametersResponse($this->requestValidator->getMessage());
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
     * @throws InvalidPluginStateException
     * @throws InvalidAuthorizationTokenException
     * @throws InvalidAuthorizationHeaderException
     */
    public function validateAuthorization(string $pluginIdentifier = null): void
    {
        if (! $this->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new InvalidAuthorizationHeaderException();
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
            throw new InvalidAuthorizationTokenException();
        }

        // Check if the plugin is active
        if ($pluginIdentifier !== null && ! $this->validatePluginState($application, $pluginIdentifier)) {
            throw new InvalidPluginStateException();
        }

        // Save the application for later use
        $this->prontoMobile->setApplication($application);
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
