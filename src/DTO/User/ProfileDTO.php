<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO\User;

use Pronto\MobileBundle\DTO\BaseDTO;
use Symfony\Component\Validator\Constraints as Assert;

class ProfileDTO extends BaseDTO
{
    /**
     * @var string $firstName
     */
    #[Assert\NotBlank]
    public $firstName;

    /**
     * @var string $insertion
     */
    public $insertion;

    /**
     * @var string $lastName
     */
    #[Assert\NotBlank]
    public $lastName;

    /**
     * @var string $email
     */
    #[Assert\NotBlank]
    #[Assert\Email]
    public $email;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['firstName', 'insertion', 'lastName', 'email'];
    }
}
