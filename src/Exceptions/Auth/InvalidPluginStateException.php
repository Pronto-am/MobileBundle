<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Auth;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class InvalidPluginStateException extends JsonResponseException
{
    public function message(): string
    {
        return 'The plugin is not activated for this account';
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
