<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\AppUsers;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class EmailAlreadyExistsException extends JsonResponseException
{
    public function message(): string
    {
        return 'An account with the provided email address already exists';
    }

    public function statusCode(): int
    {
        return 409;
    }
}
