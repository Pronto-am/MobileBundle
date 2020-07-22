<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Auth;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class InvalidAuthorizationTokenException extends JsonResponseException
{
    public function message(): string
    {
        return 'Invalid authorization token';
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
