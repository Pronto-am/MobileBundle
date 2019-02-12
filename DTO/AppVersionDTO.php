<?php

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class AppVersionDTO
 * @package Pronto\MobileBundle\DTO
 */
class AppVersionDTO extends BaseDTO
{
	/**
	 * @var string $version
	 * @Assert\NotBlank()
	 */
	public $version;

	/**
	 * @var string $platform
	 * @Assert\NotBlank()
	 */
	public $platform;

	/**
	 * @var string $releaseDate
	 * @Assert\NotBlank()
	 */
	public $releaseDate;

	/**
	 * @var bool $required
	 */
	public $required = false;

	/**
	 * @var string $description
	 * @Assert\Type(type="array")
	 * @Assert\All(constraints={@Assert\NotBlank()})
	 */
	public $description;

	/**
	 * @var string $url
	 */
	public $url;

	/**
	 * @var null|File $file
	 */
	public $file;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return [
			'version',
			'platform',
			'releaseDate',
			'required' => 'isRequired',
			'description',
			'url'
		];
	}
}