<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Entity\Device;

/**
 * Class ApplicationRequest
 * @package Pronto\MobileBundle\Request
 */
class DeviceRequest extends Request
{
	/**
	 * @var bool
	 */
	public $testDevice;


	/**
	 * AppUserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = Device::class;
	}


	/**
	 * @param Device|null $entity
	 * @return Device
	 */
	public function toEntity($entity = null): Device
	{
		$entity = parent::toEntityByProperties($this, [
			'testDevice'
		], $entity);

		return $entity;
	}


	/**
	 * @param Device|null $entity
	 * @return AppUserRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->testDevice = $entity->getTestDevice();
		}

		return $request;
	}
}