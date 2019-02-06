<?php

namespace Pronto\MobileBundle\DTO\Translation;


use Symfony\Component\Validator\Constraints as Assert;

class UploadData
{
	/**
	 * @Assert\NotBlank(message="A file of type .json, .xml or .strings should be provided")
	 */
	public $file;

	/**
	 * @var string $type
	 * @Assert\NotBlank()
	 */
	public $type;

	/**
	 * @var string $type
	 * @Assert\NotBlank()
	 */
	public $language;

	/**
	 * @var boolean $android
	 */
	public $android;

	/**
	 * @var boolean $ios
	 */
	public $ios;
}