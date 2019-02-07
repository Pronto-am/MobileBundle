<?php

namespace Pronto\MobileBundle\DTO;


use Symfony\Component\Validator\Constraints as Assert;

class TranslationDTO extends BaseDTO
{
	/**
	 * @var string $identifier
	 * @Assert\NotBlank()
	 */
	public $identifier;

	/**
	 * @var string $description
	 * @Assert\NotBlank()
	 */
	public $description;

	/**
	 * @var string $type
	 * @Assert\NotBlank()
	 */
	public $type;

	/**
	 * @var boolean $android
	 */
	public $android;

	/**
	 * @var boolean $ios
	 */
	public $ios;

	/**
	 * @var array $translations
	 */
	public $translations;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return [
			'identifier',
			'description',
			'type',
			'android' => 'isAndroid',
			'ios'     => 'isIos'
		];
	}
}