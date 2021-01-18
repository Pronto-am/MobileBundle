<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

class CoordinatesProperty extends BaseType
{

    /**
     * Parse the form data as entry value
     *
     * @return array
     */
    public function parse(): array
    {
        $this->parsed = [
            'address'   => '',
            'latitude'  => '',
            'longitude' => ''
        ];

        foreach ($this->fields as $field => $value) {
            [$identifier, $subfield] = explode('-', $field);

            $this->parsed[$subfield] = $value;
        }

        return [
            $this->getIdentifier() => $this->parsed
        ];
    }
}
