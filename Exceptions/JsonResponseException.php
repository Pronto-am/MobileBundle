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

            if ($this->dataIsJson()) {
                $error['data'] = json_decode($error['data']);
            }
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

    private function dataIsJson(): bool
    {
        // Data must be a string with starting character '{' or '['
        if ($this->data === null ||
            !is_string($this->data) ||
            (is_string($this->data) && !in_array(substr($this->data, 0, 1), ['{', '[']))) {
            return false;
        }

        json_decode($this->data);
        return json_last_error() == JSON_ERROR_NONE;
    }
}
