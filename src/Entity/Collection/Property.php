<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Collection;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Pronto\MobileBundle\Entity\TimestampedEntity;

/**
 * Class Property
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Collection\PropertyRepository")
 * @ORM\Table(name="collection_properties")
 */
class Property extends TimestampedEntity
{
    /**
     * @var int $id
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var Collection $collection
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection", inversedBy="properties")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $collection;

    /**
     * @var Type $type
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection\Property\Type")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $type;

    /**
     * @var string $name
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @var string $identifier
     * @ORM\Column(type="string")
     */
    private $identifier;

    /**
     * @var array $config
     * @ORM\Column(type="json")
     */
    private $config;

    /**
     * @var boolean $required
     * @ORM\Column(type="boolean")
     */
    private $required = true;

    /**
     * @var boolean $includeInListView
     * @ORM\Column(type="boolean")
     */
    private $includeInListView = true;

    /**
     * @var boolean $includeInJsonListView
     * @ORM\Column(type="boolean")
     */
    private $includeInJsonListView = true;

    /**
     * @var boolean $entryTitle
     * @ORM\Column(type="boolean")
     */
    private $entryTitle = false;

    /**
     * @var int $ordering
     * @ORM\Column(type="integer")
     */
    private $ordering;

    /**
     * @var boolean $translatable
     * @ORM\Column(type="boolean")
     */
    private $translatable = true;

    /**
     * @var string|null $editableForRole
     * @ORM\Column(type="string", nullable=true)
     */
    private $editableForRole = 'ROLE_USER';

    /**
     * @return int|null
     */
    public function getId(): ?int
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
     * @return Property
     */
    public function setCollection(Collection $collection): self
    {
        $this->collection = $collection;
        return $this;
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
     * @return Property
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
     * @return Property
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
     * @return Property
     */
    public function setType(Type $type): self
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @param array $config
     * @return Property
     */
    public function setConfig(array $config): self
    {
        $this->config = $config;
        return $this;
    }

    /**
     * @return bool
     */
    public function getRequired(): bool
    {
        return $this->required;
    }

    /**
     * @param bool $required
     * @return Property
     */
    public function setRequired(bool $required): self
    {
        $this->required = $required;
        return $this;
    }

    /**
     * @return bool
     */
    public function getIncludeInListView(): bool
    {
        return $this->includeInListView;
    }

    /**
     * @param bool $includeInListView
     * @return Property
     */
    public function setIncludeInListView(bool $includeInListView): self
    {
        $this->includeInListView = $includeInListView;
        return $this;
    }

    /**
     * @return bool
     */
    public function getIncludeInJsonListView(): bool
    {
        return $this->includeInJsonListView;
    }

    /**
     * @param bool $includeInJsonListView
     * @return Property
     */
    public function setIncludeInJsonListView(bool $includeInJsonListView): self
    {
        $this->includeInJsonListView = $includeInJsonListView;
        return $this;
    }

    /**
     * @return bool
     */
    public function getEntryTitle(): bool
    {
        return $this->entryTitle;
    }

    /**
     * @param bool $entryTitle
     * @return Property
     */
    public function setEntryTitle(bool $entryTitle): self
    {
        $this->entryTitle = $entryTitle;
        return $this;
    }

    /**
     * @return int
     */
    public function getOrdering(): int
    {
        return $this->ordering;
    }

    /**
     * @param int $ordering
     * @return Property
     */
    public function setOrdering(int $ordering): self
    {
        $this->ordering = $ordering;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isTranslatable()
    {
        return $this->translatable;
    }

    /**
     * @param bool $translatable
     * @return Property
     */
    public function setTranslatable($translatable): self
    {
        $this->translatable = $translatable;
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
     * @return Property
     */
    public function setEditableForRole(string $editableForRole): self
    {
        $this->editableForRole = $editableForRole;
        return $this;
    }
}
