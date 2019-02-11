<?php

namespace Pronto\MobileBundle\DTO;


abstract class BaseDTO
{
	/**
	 * @var bool $new
	 */
	public $new = true;

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
		if ($entity === null) {
			return new static();
		}

		$data = new static();
		$data->new = false;

		foreach (static::getFillable() as $field => $method) {
			if (is_numeric($field)) {
				$field = $method;
				$method = 'get' . ucfirst($field);
			}

			$data->{$field} = $entity->{$method}();
		}

		return $data;
	}

	/**
	 * @param $entity
	 * @return mixed
	 */
	public function toEntity($entity)
	{
		foreach (static::getFillable() as $field => $method) {
			if (is_numeric($field)) {
				$field = $method;
			}

			$setter = 'set' . ucfirst($field);
			$getter = 'get' . ucfirst($field);

			if (method_exists($this, $getter)) {
				$entity->{$setter}($this->{$getter}());
			} else {
				$entity->{$setter}($this->{$field});
			}
		}

		return $entity;
	}
}