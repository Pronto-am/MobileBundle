<?php

namespace Pronto\MobileBundle\Entity\Collection\Relationship;

use Pronto\MobileBundle\Entity\TimestampedEntity;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;


/**
 * Class Type
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Collection\Relationship\MapperRepository")
 * @ORM\Table(name="collection_relationship_mappers")
 * @ORM\HasLifecycleCallbacks
 */
class Mapper extends TimestampedEntity
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="string")
	 */
	private $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection\Entry")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $entryLeft;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection\Entry")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $entryRight;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $relatedCollection;


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		parent::onPrePersist();

		$this->id = Uuid::uuid1()->toString();
	}


	/**
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
	}


	/**
	 * @return mixed
	 */
	public function getEntryLeft()
	{
		return $this->entryLeft;
	}


	/**
	 * @param mixed $entryLeft
	 */
	public function setEntryLeft($entryLeft): void
	{
		$this->entryLeft = $entryLeft;
	}


	/**
	 * @return mixed
	 */
	public function getEntryRight()
	{
		return $this->entryRight;
	}


	/**
	 * @param mixed $entryRight
	 */
	public function setEntryRight($entryRight): void
	{
		$this->entryRight = $entryRight;
	}


	/**
	 * @return mixed
	 */
	public function getRelatedCollection()
	{
		return $this->relatedCollection;
	}


	/**
	 * @param mixed $relatedCollection
	 */
	public function setRelatedCollection($relatedCollection): void
	{
		$this->relatedCollection = $relatedCollection;
	}
}