<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Devices;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class AlreadyRegisteredException extends JsonResponseException
{
    public function message(): string
    {
        return 'This device is already registered';
    }

    public function statusCode(): int
    {
        return 200;
    }
}
