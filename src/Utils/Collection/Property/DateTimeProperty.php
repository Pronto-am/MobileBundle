<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

class DateTimeProperty extends BaseType
{

    /**
     * Parse the form data as entry value
     *
     * @return array
     */
    public function parse(): array
    {
        $parsed = [
            'date' => '',
            'time' => '',
        ];

        foreach ($this->fields as $field => $value) {
            [$identifier, $subfield] = explode('-', $field);

            $parsed[$subfield] = $value;
        }

        $date = !empty($parsed['date']) ? date('Y-m-d', strtotime($parsed['date'])) : null;
        $time = !empty($parsed['time']) ? $parsed['time'] : null;

        $this->parsed = $date !== null && $time !== null ? $date . ' ' . $time . ':00' : null;

        return [
            $this->getIdentifier() => $this->parsed
        ];
    }
}
