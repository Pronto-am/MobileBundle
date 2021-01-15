<?php

namespace Pronto\MobileBundle\Service\Collection;


use DateTime;
use Pronto\MobileBundle\Entity\Collection\Property;
use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Pronto\MobileBundle\Service\JsonTranslator;
use Symfony\Component\Translation\TranslatorInterface;

class EntryValueParser
{
	/**
     * @var TranslatorInterface $translator
     */
	private $translator;

	/**
     * @var JsonTranslator $jsonTranslator
     */
	private $jsonTranslator;

	/**
	 * EntryValueParser constructor.
	 *
	 * @param TranslatorInterface $translator
	 * @param JsonTranslator $jsonTranslator
	 */
	public function __construct(TranslatorInterface $translator, JsonTranslator $jsonTranslator)
	{
		$this->translator = $translator;
		$this->jsonTranslator = $jsonTranslator;
	}

    /**
     * Parse an entry property
     *
     * @param Property $property
     * @param mixed $value
     * @return string
     */
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

	/**
	 * Return plain text
	 *
	 * @param string $value
	 * @return string
	 */
	public function parseText(?string $value): string
	{
		return $value ?? '';
	}

    /**
     * Return date string
     *
     * @param string $value
     * @return string
     * @throws \Exception
     */
	public function parseDate(string $value): string
	{
		$date = new DateTime($value);

		return $date->format('d-m-Y');
	}

    /**
     * Return date string
     *
     * @param string $value
     * @return string
     * @throws \Exception
     */
	public function parseDateTime(string $value): string
	{
		$dateTime = new DateTime($value);

		return $this->translator->trans('format.date_and_time', ['%date%' => $dateTime->format('d-m-Y'), '%time%' => $dateTime->format('H:i')]);
	}

	/**
	 * Parse a boolean
	 *
	 * @param bool $value
	 * @return string
	 */
	public function parseBoolean(bool $value): string
	{
		return $this->translator->trans('collection.entry.value_' . ($value ? 'true' : 'false'));
	}
}
