<?php

namespace Pronto\MobileBundle\DTO\Collection;

use Pronto\MobileBundle\DTO\BaseDTO;
use Pronto\MobileBundle\Entity\Collection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class RelationshipDTO
 * @package Pronto\MobileBundle\DTO\Collection
 */
class RelationshipDTO extends BaseDTO
{
	/**
	 * @var string $name
     * @Assert\NotBlank()
     */
	public $name;

	/**
	 * @var string $identifier
     * @Assert\NotBlank()
     */
	public $identifier;

    /**
     * @var Collection $relatedCollection
     * @Assert\NotBlank()
     */
	public $relatedCollection;

    /**
     * @var string $type
     * @Assert\NotBlank()
     */
	public $type;

    /**
     * @var boolean $includeInJsonListView
     */
	public $includeInJsonListView;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['name', 'identifier', 'relatedCollection', 'type', 'includeInJsonListView'];
	}
}