<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use Pronto\MobileBundle\Utils\Optional;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class ApplicationDTO
 * @package Pronto\MobileBundle\Request
 */
class ApplicationDTO extends BaseDTO
{
	/**
	 * @Assert\NotBlank()
	 * @var string $name
	 */
	public $name;

	/**
	 * @var string $label
	 */
	public $label;

	/**
	 * @Assert\NotBlank()
	 * @var string $color
	 */
	public $color;

	/**
	 * @Assert\NotBlank()
	 * @var string $androidBundleIdentifier
	 */
	public $androidBundleIdentifier;

	/**
	 * @Assert\NotBlank()
	 * @var string $iosBundleIdentifier
	 */
	public $iosBundleIdentifier;

	/**
	 * @var string $clientId
	 */
	public $clientId;

	/**
	 * @var string $clientSecret
	 */
	public $clientSecret;

	/**
	 * @Assert\NotBlank()
	 * @var object $defaultLanguage
	 */
	public $defaultLanguage;

	/**
	 * @Assert\NotBlank()
	 * @var array $availableLanguages
	 */
	public $availableLanguages;

	/**
	 * @return string|null
	 */
	public function getDefaultLanguage(): ?string
	{
		return Optional::get($this->defaultLanguage)->code;
	}

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['name', 'label', 'color', 'androidBundleIdentifier', 'iosBundleIdentifier', 'defaultLanguage', 'availableLanguages'];
	}
}
