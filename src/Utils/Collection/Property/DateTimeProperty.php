<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

class DateTimeProperty extends BaseType
{
    public function parse(): array
    {
        $parsed = [
            'date' => '',
            'time' => '',
        ];

        foreach ($this->fields as $field => $value) {
            [, $subfield] = explode('-', $field);

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
