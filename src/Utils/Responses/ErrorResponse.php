<?php

namespace Pronto\MobileBundle\Utils\Responses;

use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\Entity\TranslationKey;

class ErrorResponse extends BaseResponse
{
    // Entity not found
    public const NOT_FOUND = [404, 4, '{entity} not found'];

    // Error code prefixes per entity
    public const ERROR_CODE_PREFIXES = [
        Segment::class          => 10,
        Device::class           => 11,
        AppUser::class          => 11,
        Collection::class       => 12,
        Collection\Entry::class => 13,
        TranslationKey::class   => 14,
        AppVersion::class       => 15
    ];

    private ?string $entity;
    private ?int $errorCode;

    public function __construct(array $error)
    {
        $this->parseError($error);
    }

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

    private function setErrorCode(int $errorCode): void
    {
        $this->errorCode = $errorCode;
    }

    public function forEntity(string $entity): self
    {
        if ($entity !== '') {
            $this->entity = $entity;
        }

        return $this;
    }

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

    private function getErrorCode(): int
    {
        // Get the prefix
        $prefix = $this->getErrorCodePrefix();

        // Add leading zero's to the error code
        $errorCode = str_pad($this->errorCode, 2, 0, STR_PAD_LEFT);

        return $prefix . $errorCode;
    }

    private function getErrorCodePrefix(): int
    {
        if ($this->entity !== null && isset(self::ERROR_CODE_PREFIXES[$this->entity])) {
            return self::ERROR_CODE_PREFIXES[$this->entity];
        }

        return 4;
    }
}
