<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Devices;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class MissingTokenException extends JsonResponseException
{
    public function message(): string
    {
        return 'Either the firebaseToken or the apnsToken should be provided';
    }

    public function statusCode(): int
    {
        return 422;
    }
}
