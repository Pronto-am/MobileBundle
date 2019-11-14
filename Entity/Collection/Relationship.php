<?php

namespace Pronto\MobileBundle\Entity\Collection;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Relationship\Type;
use Pronto\MobileBundle\Entity\TimestampedEntity;
use Ramsey\Uuid\Uuid;


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
	 * @ORM\Column(type="string", unique=true)
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
	 */
	private $relatedCollection;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection\Relationship\Type")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $type;

	/**
	 * @ORM\Column(type="string")
	 */
	private $name;

	/**
	 * @ORM\Column(type="string")
	 */
	private $identifier;

	/**
	 * @ORM\Column(type="boolean")
	 */
	private $includeInJsonListView = true;

    /**
     * @var string|null $editableForRole
     * @ORM\Column(type="string", nullable=true)
     */
    private $editableForRole = 'ROLE_USER';

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
	 * @return string|null
	 */
	public function getId(): ?string
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
     * @return Relationship
     */
	public function setCollection(Collection $collection): self
	{
		$this->collection = $collection;
        return $this;
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
     * @return Relationship
     */
	public function setRelatedCollection(Collection $relatedCollection): self
	{
		$this->relatedCollection = $relatedCollection;
        return $this;
    }

	/**
	 * @return string
	 */
	public function getName(): ?string
	{
		return $this->name;
	}

	/**
	 * @param string $name
     * @return Relationship
     */
	public function setName(string $name): self
	{
		$this->name = $name;
        return $this;
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
     * @return Relationship
	 */
	public function setIdentifier(string $identifier): self
	{
		$this->identifier = $identifier;
        return $this;
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
     * @return Relationship
     */
	public function setType(Type $type): self
	{
		$this->type = $type;
        return $this;
    }

	/**
	 * @return bool
	 */
	public function includeInJsonListView(): bool
	{
		return $this->includeInJsonListView;
	}

	/**
	 * @param bool $includeInListView
     * @return Relationship
     */
	public function setIncludeInJsonListView(bool $includeInListView): self
	{
		$this->includeInJsonListView = $includeInListView;
		return $this;
	}

    /**
     * @return string
     */
    public function editableForRole(): string
    {
        return $this->editableForRole ?? 'ROLE_USER';
    }

    /**
     * @param string $editableForRole
     * @return Relationship
     */
    public function setEditableForRole(string $editableForRole): self
    {
        $this->editableForRole = $editableForRole;
        return $this;
    }
}
