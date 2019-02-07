<?php

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class UserDTO
 * @package Pronto\MobileBundle\DTO
 */
class UserDTO extends BaseDTO
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