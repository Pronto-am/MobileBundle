<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Entity\Collection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class CollectionRequest
 * @package Pronto\MobileBundle\Request
 */
class CollectionRequest extends Request
{
	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $name;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $identifier;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $icon;


	/**
	 * AppUserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = Collection::class;
	}


	/**
	 * @param Collection|null $entity
	 * @return Collection
	 */
	public function toEntity($entity = null): Collection
	{
		$entity = parent::toEntityByProperties($this, [
			'name', 'identifier', 'icon'
		], $entity);

		return $entity;
	}


	/**
	 * @param Collection|null $entity
	 * @return CollectionRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->name = $entity->getName();
			$request->identifier = $entity->getIdentifier();
			$request->icon = $entity->getIcon();
		}

		return $request;
	}
}