<?php

namespace Pronto\MobileBundle\Utils;

class Optional
{
    /**
     * @var mixed $value
     */
    protected $value;

    public function __construct($value)
    {
        $this->value = $value;
    }

    public static function get($value): Optional
    {
        return new self($value);
    }

    public function __get($key)
    {
        if (is_object($this->value)) {
            return $this->value->{$key} ?? null;
        }

        return null;
    }

    public function __isset($name)
    {
        if (is_object($this->value)) {
            return isset($this->value->{$name});
        }

        return false;
    }

    public function __call($name, $arguments)
    {
        if (is_object($this->value)) {
            return $this->value->{$name}($arguments) ?? null;
        }

        return null;
    }
}
