<?php

namespace Pronto\MobileBundle\Request;

abstract class Request implements RequestInterface
{
	/** @var string $model The model class to return */
	protected $model;


	/**
	 * @param RequestInterface $request
	 * @param array $properties
	 * @param null $entity
	 * @return mixed
	 */
	public function toEntityByProperties(RequestInterface $request, array $properties = [], $entity = null)
	{
		// Get the existing entity or create a new one
		$entity = $entity ?? new $this->model();

		foreach($properties as $property) {
			$entity->{'set' . ucfirst($property)}($request->{$property});
		}

		return $entity;
	}
}