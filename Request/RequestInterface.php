<?php

namespace Pronto\MobileBundle\Request;


interface RequestInterface
{
	/**
	 * @param mixed $entity
	 * @return mixed
	 */
	public function toEntity($entity);


	/**
	 * @param mixed $entity
	 * @return self
	 */
	public static function fromEntity($entity): self;


	/**
	 * @param RequestInterface $request
	 * @param array $properties
	 * @return mixed
	 */
	public function toEntityByProperties(RequestInterface $request, array $properties);
}