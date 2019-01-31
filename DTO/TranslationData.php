<?php

namespace Pronto\MobileBundle\DTO;


use Symfony\Component\Validator\Constraints as Assert;

class TranslationData extends BaseData
{
	/**
	 * @var string $identifier
	 * @Assert\NotBlank()
	 */
	public $identifier;

	/**
	 * @var string $type
	 * @Assert\NotBlank()
	 */
	public $type;

	/**
	 * @var array $translations
	 */
	public $translations;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['identifier', 'type'];
	}
}