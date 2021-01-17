<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO\User;

use Pronto\MobileBundle\DTO\BaseDTO;
use Symfony\Component\Validator\Constraints as Assert;

class ProfileDTO extends BaseDTO
{
    /**
     * @Assert\NotBlank()
     * @var string $firstName
     */
    public $firstName;

    /**
     * @var string $insertion
     */
    public $insertion;

    /**
     * @Assert\NotBlank()
     * @var string $lastName
     */
    public $lastName;

    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     * @var string $email
     */
    public $email;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['firstName', 'insertion', 'lastName', 'email'];
    }
}
