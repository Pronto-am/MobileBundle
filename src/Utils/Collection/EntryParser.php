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
    private array $entry = [];
    private array $formData;
    private FileBag $files;
    private ?string $uploadsDir;

    private array $classes = [
        'boolean'     => BooleanProperty::class,
        'coordinates' => CoordinatesProperty::class,
        'date'        => DateProperty::class,
        'dateTime'    => DateTimeProperty::class,
        'file'        => FileProperty::class
    ];

    public function __construct(Request $request, ?string $uploadsDir = null)
    {
        $this->formData = $request->request->all();

        // Remove the active checkbox
        unset($this->formData['active']);

        // Set the additional files
        $this->files = $request->files;
        $this->uploadsDir = $uploadsDir;
    }

    public function setInitialData(array $initial): void
    {
        $this->entry = $initial;
    }

    public function addProperty(Property $property): void
    {
        // Get the right property transformer
        $type = $this->getPropertyTransformer($property);

        $this->entry = array_merge($this->entry, $type->parse());
    }

    private function getPropertyTransformer(Property $property): PropertyType
    {
        $type = $property->getType()->getType();

        if (isset($this->classes[$type])) {
            $class = $this->classes[$type];

            if ($type !== 'file') {
                return new $class($this->formData, $property);
            }

            return new $class($this->formData, $property, $this->files, $this->uploadsDir);
        }

        return new BaseType($this->formData, $property);
    }

    public function getEntryObject(): array
    {
        return $this->entry;
    }
}
