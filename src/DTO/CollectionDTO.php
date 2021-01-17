<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class CollectionDTO
 * @package Pronto\MobileBundle\Request
 */
class CollectionDTO extends BaseDTO
{
    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $name;

    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $identifier;

    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $icon;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['name', 'identifier', 'icon'];
    }
}
