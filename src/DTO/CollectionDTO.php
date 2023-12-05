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
     * @var string
     */
    #[Assert\NotBlank]
    public $name;

    /**
     * @var string
     */
    #[Assert\NotBlank]
    public $identifier;

    /**
     * @var string
     */
    #[Assert\NotBlank]
    public $icon;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['name', 'identifier', 'icon'];
    }
}
