<?php

namespace Pronto\MobileBundle\Entity;


interface ApiEntityInterface
{
	/**
	 * Get the callbacks for properties after serialization
	 *
	 * @return array
	 */
	public static function getSerializerCallbacks(): array;
}
