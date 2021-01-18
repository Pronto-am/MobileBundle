<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Enum;

use MyCLabs\Enum\Enum;

/**
 * Class VariableType
 * @package Pronto\MobileBundle\Entity
 *
 * @method static VariableType STRING()
 * @method static VariableType BOOL()
 * @method static VariableType INTEGER()
 * @method static VariableType ARRAY()
 */
class VariableType extends Enum
{
    private const STRING = 'string';
    private const BOOL = 'bool';
    private const INTEGER = 'integer';
    private const ARRAY = 'array';
}
