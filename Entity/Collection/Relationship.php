<?php

namespace Pronto\MobileBundle\Entity\Collection;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Relationship\Type;
use Pronto\MobileBundle\Entity\TimestampedEntity;
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
	 * @return string
	 */
	public function getId(): string
	{
		return $this->id;
	}


	/**
	 * @return Collection
	 */
	public function getCollection(): Collection
	{
		return $this->collection;
	}


	/**
	 * @param Collection $collection
	 */
	public function setCollection(Collection $collection): void
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
	 * @param Collection $relatedCollection
	 */
	public function setRelatedCollection(Collection $relatedCollection): void
	{
		$this->relatedCollection = $relatedCollection;
	}


	/**
	 * @return string
	 */
	public function getName(): string
	{
		return $this->name;
	}


	/**
	 * @param string $name
	 */
	public function setName(string $name): void
	{
		$this->name = $name;
	}


	/**
	 * @return string
	 */
	public function getIdentifier(): string
	{
		return $this->identifier;
	}


	/**
	 * @param string $identifier
	 */
	public function setIdentifier(string $identifier): void
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
	 * @param Type $type
	 */
	public function setType(Type $type): void
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
	 * @param bool $includeInListView
	 */
	public function setIncludeInJsonListView(bool $includeInListView): void
	{
		$this->includeInJsonListview = $includeInListView;
	}
}