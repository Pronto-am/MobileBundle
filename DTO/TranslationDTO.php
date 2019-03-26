<?php

namespace Pronto\MobileBundle\DTO;


use /** @noinspection PhpUnusedAliasInspection */
    Symfony\Component\Validator\Constraints as Assert;
use /** @noinspection PhpUnusedAliasInspection */
    Pronto\MobileBundle\Validator\Constraints\Translation\IsUniqueIdentifier;

class TranslationDTO extends BaseDTO
{
	/**
	 * @var string $identifier
	 * @Assert\NotBlank()
     * @IsUniqueIdentifier
	 */
	public $identifier;

	/**
	 * @var string $description
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