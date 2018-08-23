<?php

namespace Pronto\MobileBundle\Request\Collection;

use Pronto\MobileBundle\Entity\Collection\Property;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Request\RequestInterface;

/**
 * Class ApplicationRequest
 * @package Pronto\MobileBundle\Request
 */
class PropertyRequest extends Request
{
	/**
	 * @var string
	 */
	public $name;


	/**
	 * @var string
	 */
	public $identifier;


	/**
	 * @var int
	 */
	public $type;


	/**
	 * @var bool
	 */
	public $includeInListView;


	/**
	 * @var bool
	 */
	public $includeInJsonListView;


	/**
	 * @var bool
	 */
	public $required;


	/**
	 * UserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = Property::class;
	}


	/**
	 * @param Property|null $entity
	 * @return Property
	 */
	public function toEntity($entity = null): Property
	{
		$entity = parent::toEntityByProperties($this, [
			'name',
			'identifier',
			'type',
			'includeInListView',
			'includeInJsonListView',
			'required'
		], $entity);

		return $entity;
	}


	/**
	 * @param Property|null $entity
	 * @return PropertyRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->name = $entity->getName();
			$request->identifier = $entity->getIdentifier();
			$request->type = $entity->getType();
			$request->includeInListView = $entity->getIncludeInListView();
			$request->includeInJsonListView = $entity->getIncludeInJsonListView();
			$request->required = $entity->getRequired();
		}

		return $request;
	}
}