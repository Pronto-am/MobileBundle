<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class UserDTO
 * @package Pronto\MobileBundle\DTO
 */
class UserDTO extends BaseDTO
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
     * @var bool $admin
     */
    public $admin;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['firstName', 'insertion', 'lastName', 'email'];
    }
}
