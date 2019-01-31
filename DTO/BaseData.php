<?php

namespace Pronto\MobileBundle\DTO;


abstract class BaseData
{
	/**
	 * @return array
	 */
	abstract public static function getFillable(): array;

	/**
	 * @param mixed|null $entity
	 * @return static
	 */
	public static function fromEntity($entity)
	{
		if($entity === null) {
			return new static();
		}

		$data = new static();

		foreach(static::getFillable() as $fillable) {
			$data->{$fillable} = $entity->{'get' . ucfirst($fillable)}();
		}

		return $data;
	}

	/**
	 * @param $entity
	 * @return mixed
	 */
	public function toEntity($entity)
	{
		foreach(static::getFillable() as $fillable) {
			$entity->{'set' . ucfirst($fillable)}($this->{$fillable});
		}

		return $entity;
	}
}