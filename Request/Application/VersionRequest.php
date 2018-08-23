<?php

namespace Pronto\MobileBundle\Request\Application;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Request\RequestInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class ApplicationRequest
 * @package Pronto\MobileBundle\Request
 */
class VersionRequest extends Request
{
	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $name;


	/**
	 * UserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = Application\Version::class;
	}


	/**
	 * @param Application\Version|null $entity
	 * @return Application\Version
	 */
	public function toEntity($entity = null): Application\Version
	{
		$entity = parent::toEntityByProperties($this, [
			'name'
		], $entity);

		return $entity;
	}


	/**
	 * @param Application\Version|null $entity
	 * @return VersionRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->name = $entity->getName();
		}

		return $request;
	}
}