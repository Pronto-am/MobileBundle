<?php

namespace Pronto\MobileBundle\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

abstract class JsonResponseException extends Exception
{
    /**
     * @var array|object|null
     */
    protected $data = null;

    /**
     * @param array|object|null $data
     * @return $this
     */
    public function withData($data = null): self
    {
        $this->data = $data;
        return $this;
    }

    public function response(): JsonResponse
    {
        $error = [
            'error' => [
                'message'          => $this->message(),
                'code'             => $this->code(),
                'http_status_code' => $this->statusCode(),
                'type'             => $this->type()
            ]
        ];

        if ($this->data !== null) {
            $error['data'] = $this->data;
        }

        return new JsonResponse($error, $this->statusCode());
    }

    abstract public function message(): string;

    public function code(): int
    {
        return ExceptionCode::for(get_class($this));
    }

    public function statusCode(): int
    {
        return 400;
    }

    public function type(): string
    {
        $classParts = explode('\\', get_class($this));
        return end($classParts);
    }
}
