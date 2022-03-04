<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

class BooleanProperty extends BaseType
{
    public function parse(): array
    {
        foreach ($this->fields as $field => $value) {
            $this->parsed = $value;
        }

        return [
            $this->getIdentifier() => $this->parsed !== null
        ];
    }
}
