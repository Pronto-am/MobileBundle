<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\PushNotifications;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class InvalidSegmentException extends JsonResponseException
{
    public function message(): string
    {
        return 'Segments has to be a list with the id and whether the device is subscribed or not';
    }

    public function statusCode(): int
    {
        return 422;
    }
}
