<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api;

use Doctrine\ORM\EntityManagerInterface;
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
use Pronto\MobileBundle\Service\TokenInspectionService;
use Pronto\MobileBundle\Traits\JsonResponseGenerators;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Service\Attribute\Required;

class BaseApiController extends AbstractController
{
    use JsonResponseGenerators;

    protected ProntoMobile $prontoMobile;

    protected RequestBodyValidator $requestValidator;
    protected EntityManagerInterface $entityManager;

    protected JsonSerializer $serializer;

    private TokenInspectionService $tokenInspectionService;

    public function __construct(ProntoMobile $prontoMobile, TokenInspectionService $tokenInspectionService)
    {
        $this->prontoMobile = $prontoMobile;
        $this->tokenInspectionService = $tokenInspectionService;
    }

    #[Required]
    public function setRequestBodyValidator(RequestBodyValidator $requestValidator): void
    {
        $this->requestValidator = $requestValidator;
    }

    #[Required]
    public function setJsonSerializer(JsonSerializer $serializer): void
    {
        $this->serializer = $serializer;
    }

    #[Required]
    public function setEntityManager(EntityManagerInterface $entityManager): void
    {
        $this->entityManager = $entityManager;
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
     * @throws ApiException
     */
    public function validateRequestContent(Request $request, array $required = []): bool
    {
        // Validate the required parameters
        if (!$this->requestValidator->isValid($request, $required)) {
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
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new InvalidAuthorizationHeaderException();
        }

        // The token must be an instance of the OAuth2 library token model
        $application = $this->tokenInspectionService->getApplication();

        // Check if the plugin is active
        if ($pluginIdentifier !== null && !$this->validatePluginState($application, $pluginIdentifier)) {
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
        /** @var Plugin $plugin */
        $plugin = $this->entityManager->getRepository(Plugin::class)->findOneBy([
            'identifier' => $identifier
        ]);

        /** @var ApplicationPlugin $applicationPlugin */
        $applicationPlugin = $this->entityManager->getRepository(ApplicationPlugin::class)->findOneBy([
            'plugin'      => $plugin,
            'application' => $application,
            'active'      => true
        ]);

        return $applicationPlugin !== null;
    }
}
