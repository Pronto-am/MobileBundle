<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions;

class EntityNotFoundException extends JsonResponseException
{
    public function message(): string
    {
        return 'The requested entity was not found';
    }

    public function statusCode(): int
    {
        return 404;
    }
}
