<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use Pronto\MobileBundle\Utils\Optional;
use Symfony\Component\Validator\Constraints as Assert;

class ApplicationDTO extends BaseDTO
{
    #[Assert\NotBlank]
    public $name;

    public $label;

    #[Assert\NotBlank]
    public $color;

    #[Assert\NotBlank]
    public $androidBundleIdentifier;

    #[Assert\NotBlank]
    public $iosBundleIdentifier;

    #[Assert\NotBlank]
    public $defaultLanguage;

    #[Assert\NotBlank]
    public $availableLanguages;

    public static function getFillable(): array
    {
        return ['name', 'label', 'color', 'androidBundleIdentifier', 'iosBundleIdentifier', 'defaultLanguage', 'availableLanguages'];
    }

    public function getDefaultLanguage(): ?string
    {
        return Optional::get($this->defaultLanguage)->code;
    }
}
