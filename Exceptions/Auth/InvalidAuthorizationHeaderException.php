<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Auth;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class InvalidAuthorizationHeaderException extends JsonResponseException
{
    public function message(): string
    {
        return 'Authorization token could not be parsed from the authorization header';
    }

    public function code(): int
    {
        return $this->statusCode();
    }

    public function statusCode(): int
    {
        return 401;
    }
}
