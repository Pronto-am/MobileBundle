<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

class DateProperty extends BaseType
{
    public function parse(): array
    {
        foreach ($this->fields as $field => $value) {
            $this->parsed = !empty($value) ? date('Y-m-d', strtotime($value)) : null;
        }

        return [
            $this->getIdentifier() => $this->parsed
        ];
    }
}
