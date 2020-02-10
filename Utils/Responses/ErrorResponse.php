<?php

namespace Pronto\MobileBundle\Utils\Responses;

use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Entity\User;

class ErrorResponse extends BaseResponse
{
    // Possible error messages
    public const INVALID_PARAMETERS = [422, 'Not all of the required parameters are present'];
    public const NO_AUTHORIZATION_HEADER = [401, 'No authorization header present'];
    public const NOT_AUTHORIZED = [403, 'You are not authorized to perform this request'];
    public const INVALID_AUTHORIZATION_HEADER = [401, 'Authorization token could not be parsed from the authorization header'];
    public const INVALID_AUTHORIZATION_TOKEN = [401, 'Invalid authorization token'];
    public const INVALID_PLUGIN_STATE = [403, 'The plugin is not activated for this account'];

    // Other messages
    public const NO_MESSAGE_PROVIDED = [400, 'No message provided for the error code'];

    // Entity not found
    public const NOT_FOUND = [404, 4, '{entity} not found'];

    // Error code prefixes per entity
    public const ERROR_CODE_PREFIXES = [
        Segment::class          => 10,
        Device::class           => 11,
        User::class             => 11,
        Collection::class       => 12,
        Collection\Entry::class => 13,
        TranslationKey::class   => 14,
        AppVersion::class       => 15
    ];


    /** @var string $entity */
    private $entity;

    /** @var int $errorCode */
    private $errorCode;


    /**
     * ErrorResponse constructor.
     * @param array $error
     */
    public function __construct(array $error)
    {
        $this->parseError($error);
    }


    /**
     * @param array $error
     */
    private function parseError(array $error): void
    {
        if (count($error) === 3) {
            [$httpStatusCode, $errorCode, $message] = $error;

            $this->setErrorCode($errorCode);
        } else {
            [$httpStatusCode, $message] = $error;
        }

        $this->setStatus($httpStatusCode);
        $this->setMessage($message);
    }


    /**
     * @param int $errorCode
     */
    private function setErrorCode(int $errorCode): void
    {
        $this->errorCode = $errorCode;
    }


    /**
     * @return int
     */
    private function getErrorCode(): int
    {
        // Get the prefix
        $prefix = $this->getErrorCodePrefix();

        // Add leading zero's to the error code
        $errorCode = str_pad($this->errorCode, 2, 0, STR_PAD_LEFT);

        return $prefix . $errorCode;
    }


    /**
     * Get the error code prefixes for specific entities
     *
     * @return int
     */
    private function getErrorCodePrefix(): int
    {
        if ($this->entity !== null && isset(self::ERROR_CODE_PREFIXES[$this->entity])) {
            return self::ERROR_CODE_PREFIXES[$this->entity];
        }

        return 4;
    }


    /**
     * @param string $entity
     * @return ErrorResponse
     */
    public function forEntity(string $entity): self
    {
        if ($entity !== '') {
            $this->entity = $entity;
        }

        return $this;
    }


    /**
     * Create the error message body
     *
     * @return self
     */
    public function create(): ResponseInterface
    {
        // Parse the entities name into the message if it's set
        if ($this->entity !== null) {
            $className = explode('\\', $this->entity);

            $message = str_replace('{entity}', end($className), $this->getMessage());

            // Prefix the error code with the entity specific code
            $errorCode = $this->getErrorCode();
        }

        // Generate the main content
        $content = [
            'error' => [
                'code'    => $errorCode ?? $this->getStatus(),
                'message' => $message ?? $this->getMessage()
            ]
        ];

        // Set the optional data
        if ($this->getData() !== null) {
            $content['data'] = $this->getData();
        }

        $this->setContent($content);

        return $this;
    }
}
