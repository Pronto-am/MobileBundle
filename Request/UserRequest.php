<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Entity\User;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class CreateUserRequest
 * @package Pronto\MobileBundle\Request\User
 */
class UserRequest extends Request
{
	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $firstName;


	/**
	 * @var string
	 */
	public $insertion;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $lastName;


	/**
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 * @var string
	 */
	public $email;


	/**
	 * @var bool
	 */
	public $admin;


	/**
	 * UserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = User::class;
	}


	/**
	 * @param User|null $entity
	 * @return User
	 */
	public function toEntity($entity = null): User
	{
		return parent::toEntityByProperties($this, [
			'firstName',
			'insertion',
			'lastName',
			'email'
		], $entity);
	}


	/**
	 * @param User|null $user
	 * @return UserRequest
	 */
	public static function fromEntity($user = null): RequestInterface
	{
		$userRequest = new UserRequest();

		if ($user !== null) {
			$userRequest->firstName = $user->getFirstName();
			$userRequest->insertion = $user->getInsertion();
			$userRequest->lastName = $user->getLastName();
			$userRequest->email = $user->getEmail();
		}

		return $userRequest;
	}
}