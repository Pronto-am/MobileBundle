<?php

namespace Pronto\MobileBundle\Utils;

class Optional
{
    public function __construct(
        protected mixed $value
    ) {
    }

    public static function get(mixed $value): Optional
    {
        return new self(value: $value);
    }

    public function __get($key): mixed
    {
        if (is_object($this->value)) {
            return $this->value->{$key} ?? null;
        }

        return null;
    }

    public function __isset($name): bool
    {
        if (is_object($this->value)) {
            return isset($this->value->{$name});
        }

        return false;
    }

    public function __call($name, $arguments): mixed
    {
        if (is_object($this->value)) {
            return $this->value->{$name}($arguments) ?? null;
        }

        return null;
    }
}
