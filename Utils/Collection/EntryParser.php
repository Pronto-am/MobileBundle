<?php

namespace Pronto\MobileBundle\Utils\Collection;


use Pronto\MobileBundle\Entity\Collection\Property;
use Pronto\MobileBundle\Utils\Collection\Property\BaseType;
use Pronto\MobileBundle\Utils\Collection\Property\BooleanProperty;
use Pronto\MobileBundle\Utils\Collection\Property\CoordinatesProperty;
use Pronto\MobileBundle\Utils\Collection\Property\DateProperty;
use Pronto\MobileBundle\Utils\Collection\Property\DateTimeProperty;
use Pronto\MobileBundle\Utils\Collection\Property\FileProperty;
use Pronto\MobileBundle\Utils\Collection\Property\PropertyType;
use Symfony\Component\HttpFoundation\FileBag;
use Symfony\Component\HttpFoundation\Request;

class EntryParser
{
	/**
     * @var array $entry
     */
	private $entry = [];

	/**
     * @var array $formData
     */
	private $formData;

	/**
     * @var FileBag $files
     */
	private $files;

	/**
     * @var array $classes Mapping for the property types
     */
	private $classes = [
		'boolean'     => BooleanProperty::class,
		'coordinates' => CoordinatesProperty::class,
		'date'        => DateProperty::class,
		'dateTime'    => DateTimeProperty::class,
		'file'        => FileProperty::class
	];

    /**
     * @var string|null $uploadsDir
     */
    private $uploadsDir;

    /**
	 * EntryParser constructor.
	 *
	 * @param Request $request
	 */
	public function __construct(Request $request, ?string $uploadsDir = null)
	{
		$this->formData = $request->request->all();

		// Remove the active checkbox
		unset($this->formData['active']);

		// Set the additional files
		$this->files = $request->files;
        $this->uploadsDir = $uploadsDir;
    }

    /**
     * @param array $initial
     */
	public function setInitialData(array $initial): void
    {
        $this->entry = $initial;
    }

	/**
	 * Add property values to the entry
	 *
	 * @param Property $property
	 */
	public function addProperty(Property $property): void
	{
		// Get the right property transformer
		$type = $this->getPropertyTransformer($property);

		$this->entry = array_merge($this->entry, $type->parse());
	}

	/**
	 * Get the transformer by property type
	 *
	 * @param Property $property
	 * @return PropertyType
	 */
	private function getPropertyTransformer(Property $property): PropertyType
	{
		$type = $property->getType()->getType();

		if (isset($this->classes[$type])) {
			$class = $this->classes[$type];

			if($type !== 'file') {
				return new $class($this->formData, $property);
			}

			return new $class($this->formData, $property, $this->files, $this->uploadsDir);
		}

		return new BaseType($this->formData, $property);
	}

	/**
	 * Get the entry object as array
	 *
	 * @return array
	 */
	public function getEntryObject(): array
	{
		return $this->entry;
	}
}
