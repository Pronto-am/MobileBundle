<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions\AppUsers;

use Pronto\MobileBundle\Exceptions\JsonResponseException;

class UserNotActivatedException extends JsonResponseException
{
    public function message(): string
    {
        return 'The users\' account hasn\'t been activated yet';
    }
}
