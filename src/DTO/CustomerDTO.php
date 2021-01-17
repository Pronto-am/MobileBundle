<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class CustomerDTO
 * @package Pronto\MobileBundle\DTO
 */
class CustomerDTO extends BaseDTO
{
	/**
	 * @Assert\NotBlank()
	 * @var string $companyName
	 */
	public $companyName;

	/**
	 * @Assert\NotBlank()
	 * @var string $contactPerson
	 */
	public $contactPerson;

	/**
	 * @Assert\NotBlank()
	 * @var string $phoneNumber
	 */
	public $phoneNumber;

	/**
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 * @var string $email
	 */
	public $email;

	/**
	 * @Assert\NotBlank()
	 * @var string $primaryColor
	 */
	public $primaryColor;

	/**
	 * @Assert\NotBlank()
	 * @var string $secondaryColor
	 */
	public $secondaryColor;

	/**
	 * @Assert\NotBlank()
	 * @var string $sidebarColor
	 */
	public $sidebarColor;

	/**
	 * @Assert\File(mimeTypes={
	 *     "image/jpeg", "image/png"
	 *     })
	 * @Assert\Image(
	 *     minWidth = 500,
	 *     maxWidth = 500,
	 *     minHeight = 120,
	 *     maxHeight = 120
	 * )
	 * @var string $logo
	 */
	public $logo;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['companyName', 'contactPerson', 'phoneNumber', 'email', 'logo', 'primaryColor', 'secondaryColor', 'sidebarColor'];
	}
}
