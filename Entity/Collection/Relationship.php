<?php

namespace Pronto\MobileBundle\Entity\Collection;

use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Relationship\Type;
use Pronto\MobileBundle\Entity\TimestampedEntity;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Relationship
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="collection_relationships")
 * @ORM\HasLifecycleCallbacks
 */
class Relationship extends TimestampedEntity
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="string")
	 */
	private $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection", inversedBy="relationships")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $collection;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 * @Assert\NotBlank()
	 */
	private $relatedCollection;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection\Relationship\Type")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 * @Assert\NotBlank()
	 */
	private $type;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $name;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $identifier;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $includeInJsonListview = true;


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
	public function getCollection()
	{
		return $this->collection;
	}


	/**
	 * @param mixed $collection
	 */
	public function setCollection($collection): void
	{
		$this->collection = $collection;
	}


	/**
	 * @return Collection
	 */
	public function getRelatedCollection(): Collection
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


	/**
	 * @return mixed
	 */
	public function getName()
	{
		return $this->name;
	}


	/**
	 * @param mixed $name
	 */
	public function setName($name): void
	{
		$this->name = $name;
	}


	/**
	 * @return mixed
	 */
	public function getIdentifier()
	{
		return $this->identifier;
	}


	/**
	 * @param mixed $identifier
	 */
	public function setIdentifier($identifier): void
	{
		$this->identifier = $identifier;
	}


	/**
	 * @return Type
	 */
	public function getType(): Type
	{
		return $this->type;
	}


	/**
	 * @param mixed $type
	 */
	public function setType($type): void
	{
		$this->type = $type;
	}


	/**
	 * @return bool
	 */
	public function includeInJsonListView(): bool
	{
		return $this->includeInJsonListview;
	}


	/**
	 * @param mixed $includeInListView
	 */
	public function setIncludeInJsonListView($includeInListView): void
	{
		$this->includeInJsonListview = $includeInListView;
	}
}