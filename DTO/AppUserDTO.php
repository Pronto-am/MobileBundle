<?php

namespace Pronto\MobileBundle\DTO;

/**
 * Class AppUserDTO
 * @package Pronto\MobileBundle\Request
 */
class AppUserDTO extends BaseDTO
{
	/**
	 * @var bool
	 */
	public $activated;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['activated'];
	}
}