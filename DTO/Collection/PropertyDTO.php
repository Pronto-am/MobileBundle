<?php

namespace Pronto\MobileBundle\DTO\Collection;

use Pronto\MobileBundle\DTO\BaseDTO;

/**
 * Class PropertyDTO
 * @package Pronto\MobileBundle\DTO\Collection
 */
class PropertyDTO extends BaseDTO
{
	/**
	 * @var string $name
	 */
	public $name;

	/**
	 * @var string $identifier
	 */
	public $identifier;

	/**
	 * @var int $type
	 */
	public $type;

	/**
	 * @var bool $includeInListView
	 */
	public $includeInListView;

	/**
	 * @var bool $includeInJsonListView
	 */
	public $includeInJsonListView;

	/**
	 * @var bool $required
	 */
	public $required;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['name', 'identifier', 'type', 'includeInListView', 'includeInJsonListView', 'required'];
	}
}