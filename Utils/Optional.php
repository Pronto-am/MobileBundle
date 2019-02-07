<?php

namespace Pronto\MobileBundle\Utils;


class Optional
{
	/**
	 * The underlying object.
	 *
	 * @var mixed
	 */
	protected $value;

	/**
	 * Create a new optional instance.
	 *
	 * @param  mixed  $value
	 * @return void
	 */
	public function __construct($value)
	{
		$this->value = $value;
	}

	/**
	 * @param $value
	 * @return Optional
	 */
	public static function get($value): Optional
	{
		return new self($value);
	}

	/**
	 * Dynamically access a property on the underlying object.
	 *
	 * @param  string  $key
	 * @return mixed
	 */
	public function __get($key)
	{
		if (is_object($this->value)) {
			return $this->value->{$key} ?? null;
		}
	}

	/**
	 * Dynamically check a property exists on the underlying object.
	 *
	 * @param  mixed  $name
	 * @return bool
	 */
	public function __isset($name)
	{
		if (is_object($this->value)) {
			return isset($this->value->{$name});
		}

		return false;
	}
}