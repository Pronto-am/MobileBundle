<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\Applications;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class OneVersionRequiredException extends JsonResponseException
{
    public function message(): string
    {
        return 'There has to be at least one version of an application';
    }

    public function statusCode(): int
    {
        return 422;
    }
}
