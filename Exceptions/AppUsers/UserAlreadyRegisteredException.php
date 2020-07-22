<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\AppUsers;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class UserAlreadyRegisteredException extends JsonResponseException
{
    public function message(): string
    {
        return 'This user is already registered';
    }

    public function statusCode(): int
    {
        return 409;
    }
}
