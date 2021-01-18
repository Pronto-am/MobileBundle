<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

class BooleanProperty extends BaseType
{

    /**
     * Parse the form data as entry value
     *
     * @return array
     */
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
