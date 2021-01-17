<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO\Application;

use Pronto\MobileBundle\DTO\BaseDTO;
use Symfony\Component\Validator\Constraints as Assert;

class VersionDTO extends BaseDTO
{
	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $name;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['name'];
	}
}
