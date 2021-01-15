<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\TranslationKeys;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class ZipFileNotCreatedException extends JsonResponseException
{
    public function message(): string
    {
        return 'Could not create zip file';
    }
}
