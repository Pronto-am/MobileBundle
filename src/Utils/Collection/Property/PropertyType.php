<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;

use Pronto\MobileBundle\Entity\Collection\Property;
use Symfony\Component\HttpFoundation\FileBag;

interface PropertyType
{
    public function __construct(array $formData, Property $property, FileBag $fileBag = null);

    /**
     * Parse the form data as entry value
     */
    public function parse(): array;

    /**
     * Get the identifier of the property
     */
    public function getIdentifier(): string;

    /**
     * Check if a property is translatable
     */
    public function isTranslatable(): bool;

    /**
     * Parse the language and identifier from the field name
     */
    public function parseIdentifier($field): array;

    /**
     * Check if a field belongs to a property
     */
    public function belongsToProperty($field): bool;
}
