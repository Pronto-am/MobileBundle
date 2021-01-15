<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Auth;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class NotAuthorizedException extends JsonResponseException
{
    public function message(): string
    {
        return 'You are not authorized to perform this request';
    }

    public function code(): int
    {
        return $this->statusCode();
    }

    public function statusCode(): int
    {
        return 403;
    }
}
