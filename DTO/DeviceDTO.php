<?php

namespace Pronto\MobileBundle\DTO;

/**
 * Class DeviceDTO
 * @package Pronto\MobileBundle\DTO
 */
class DeviceDTO extends BaseDTO
{
	/**
	 * @var bool $testDevice
	 */
	public $testDevice;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['testDevice'];
	}
}