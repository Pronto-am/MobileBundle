<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Entity\AppUser;

/**
 * Class ApplicationRequest
 * @package Pronto\MobileBundle\Request
 */
class AppUserRequest extends Request
{
	/**
	 * @var bool
	 */
	public $activated;


	/**
	 * AppUserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = AppUser::class;
	}


	/**
	 * @param AppUser|null $entity
	 * @return AppUser
	 */
	public function toEntity($entity = null): AppUser
	{
		$entity = parent::toEntityByProperties($this, [
			'activated'
		], $entity);

		return $entity;
	}


	/**
	 * @param AppUser|null $entity
	 * @return AppUserRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->activated = $entity->getActivated();
		}

		return $request;
	}
}