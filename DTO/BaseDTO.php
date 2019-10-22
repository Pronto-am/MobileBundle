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
		    // The fillable fields can be defined like: [$index] => [$fieldName] or [$fieldName] => [$methodName]
            // If the methodName is not provided, use the default notation to retrieve the value from the entity: 'get{$field}()'
            if (is_numeric($field)) {
				$field = $method;
				$method = 'get' . ucfirst($field);
			}

            // The DTO class might have a custom setter for the property, defined like 'set{$field}()'
            $setter = 'set' . ucfirst($field);

            // Optionally set the property by using a custom method, otherwise, use the entity get method
            if (method_exists($data, $setter)) {
                $data->{$setter}($entity);
            } else {
                $data->{$field} = $entity->{$method}();
            }
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
            // The fillable fields can be defined like: [$index] => [$fieldName] or [$fieldName] => [$methodName]
            // If the methodName is not provided, use the default notation to retrieve the value from the entity: 'set{$field}()'
			if (is_numeric($field)) {
				$field = $method;
			}

			$setter = 'set' . ucfirst($field);
			$getter = 'get' . ucfirst($field);

            // The DTO class might have a custom getter for the property, defined like 'get{$field}()'
			if (method_exists($this, $getter)) {
				$entity->{$setter}($this->{$getter}());
			} else {
				$entity->{$setter}($this->{$field});
			}
		}

		return $entity;
	}
}
