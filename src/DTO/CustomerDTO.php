<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class CustomerDTO
 * @package Pronto\MobileBundle\DTO
 */
class CustomerDTO extends BaseDTO
{
    /**
     * @var string $companyName
     */
    #[Assert\NotBlank]
    public $companyName;

    /**
     * @var string $contactPerson
     */
    #[Assert\NotBlank]
    public $contactPerson;

    /**
     * @var string $phoneNumber
     */
    #[Assert\NotBlank]
    public $phoneNumber;

    /**
     * @var string $email
     */
    #[Assert\NotBlank]
    #[Assert\Email]
    public $email;

    /**
     * @var string $primaryColor
     */
    #[Assert\NotBlank]
    public $primaryColor;

    /**
     * @var string $secondaryColor
     */
    #[Assert\NotBlank]
    public $secondaryColor;

    /**
     * @var string $sidebarColor
     */
    #[Assert\NotBlank]
    public $sidebarColor;

    /**
     * @var string $logo
     */
    #[Assert\File(mimeTypes: ['image/jpeg', 'image/png'])]
    #[Assert\Image(minWidth: 500, maxWidth: 500, minHeight: 120, maxHeight: 120)]
    public $logo;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['companyName', 'contactPerson', 'phoneNumber', 'email', 'logo', 'primaryColor', 'secondaryColor', 'sidebarColor'];
    }
}
