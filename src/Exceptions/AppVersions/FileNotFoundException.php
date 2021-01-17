<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\AppVersions;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class FileNotFoundException extends JsonResponseException
{
    public function message(): string
    {
        return 'Version file not found';
    }

    public function statusCode(): int
    {
        return 404;
    }
}
