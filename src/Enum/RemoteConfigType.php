<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Enum;

use MyCLabs\Enum\Enum;

/**
 * Class RemoteConfigType
 * @package Pronto\MobileBundle\Entity
 *
 * @method static RemoteConfigType STRING()
 * @method static RemoteConfigType BOOL()
 * @method static RemoteConfigType INTEGER()
 * @method static RemoteConfigType ENUM()
 * @method static RemoteConfigType JSON()
 */
class RemoteConfigType extends Enum
{
    private const STRING = 'string';
    private const BOOL = 'bool';
    private const INTEGER = 'integer';
    private const ENUM = 'enum';
    private const JSON = 'json';

    public function getText()
    {

    }
}
