<?php

namespace Pronto\MobileBundle\Service\Collection;

use DateTime;
use Exception;
use Pronto\MobileBundle\Entity\Collection\Property;
use Pronto\MobileBundle\Service\JsonTranslator;
use Symfony\Contracts\Translation\TranslatorInterface;

class EntryValueParser
{
    private TranslatorInterface $translator;
    private JsonTranslator $jsonTranslator;

    public function __construct(TranslatorInterface $translator, JsonTranslator $jsonTranslator)
    {
        $this->translator = $translator;
        $this->jsonTranslator = $jsonTranslator;
    }

    public function parse(Property $property, $value): string
    {
        $type = $property->getType();

        if ($property->isTranslatable()) {
            $value = $this->jsonTranslator->getTranslation($value);
        }

        if (method_exists($this, 'parse' . ucfirst($type->getType()))) {
            return $this->{'parse' . ucfirst($type->getType())}($value);
        }

        return $this->parseText($value);
    }

    public function parseText($value = null): string
    {
        // When making a field non translatable, instead of translatable, the param will still be an array
        if (is_array($value)) {
            $array = array_values($value);
            return count($array) > 0 ? $array[0] : '';
        }

        return $value ?? '';
    }

    /**
     * @throws Exception
     */
    public function parseDate(string $value): string
    {
        $date = new DateTime($value);

        return $date->format('d-m-Y');
    }

    /**
     * @throws Exception
     */
    public function parseDateTime(string $value): string
    {
        $dateTime = new DateTime($value);

        return $this->translator->trans('format.date_and_time', ['%date%' => $dateTime->format('d-m-Y'), '%time%' => $dateTime->format('H:i')]);
    }

    public function parseBoolean(bool $value): string
    {
        return $this->translator->trans('collection.entry.value_' . ($value ? 'true' : 'false'));
    }
}
