<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

use Pronto\MobileBundle\Entity\Collection\Property;
use Symfony\Component\HttpFoundation\FileBag;

class BaseType implements PropertyType
{
    public array $fields;
    public Property $property;
    public array $identifier;
    public array $parsed;

    public function __construct(array $formData, Property $property)
    {
        $this->property = $property;

        // Filter out the form fields belonging to this property
        $this->fields = array_filter($formData, function ($key) {
            return $this->belongsToProperty($key);
        }, ARRAY_FILTER_USE_KEY);
    }

    public function belongsToProperty($field): bool
    {
        [, $identifier] = $this->parseIdentifier($field);

        return $identifier === $this->getIdentifier();
    }

    public function parseIdentifier($field): array
    {
        if (strpos($field, ':') !== false) {
            [$language, $field] = explode(':', $field);
        }

        $identifier = explode('-', $field);

        return [$language ?? null, $identifier[0]];
    }

    public function getIdentifier(): string
    {
        return $this->property->getIdentifier();
    }

    public function parse(): array
    {
        // Define the structure for the parsed object
        foreach ($this->fields as $field => $value) {
            // Check if the property is translatable, so we can add a translated object
            if ($this->isTranslatable()) {
                [$language] = $this->parseIdentifier($field);

                $this->parsed[$language] = $value;
            } else {
                $this->parsed = $value;
            }
        }

        return [
            $this->getIdentifier() => $this->parsed
        ];
    }

    public function isTranslatable(): bool
    {
        return $this->property->isTranslatable();
    }
}
