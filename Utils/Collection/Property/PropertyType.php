<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;


use Pronto\MobileBundle\Entity\Collection\Property;
use Symfony\Component\HttpFoundation\FileBag;

interface PropertyType
{
	/**
	 * Parse the form data as entry value
	 *
	 * @return array
	 */
	public function parse(): array;

	/**
	 * Get the identifier of the property
	 *
	 * @return string
	 */
	public function getIdentifier(): string;

	/**
	 * Check if a property is translatable
	 *
	 * @return boolean
	 */
	public function isTranslatable(): bool;

	/**
	 * Parse the language and identifier from the field name
	 *
	 * @param $field
	 * @return array
	 */
	public function parseIdentifier($field): array;

	/**
	 * Check if a field belongs to a property
	 *
	 * @param $field
	 * @return boolean
	 */
	public function belongsToProperty($field): bool;
}
