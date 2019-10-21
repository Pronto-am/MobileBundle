<?php

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
     * @ORM\Column(type="json_array")
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
     */
    public function setCollection(Collection $collection): void
    {
        $this->collection = $collection;
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
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @param array $config
     */
    public function setConfig(array $config): void
    {
        $this->config = $config;
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
     */
    public function setRequired(bool $required): void
    {
        $this->required = $required;
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
     */
    public function setIncludeInListView(bool $includeInListView): void
    {
        $this->includeInListView = $includeInListView;
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
     */
    public function setIncludeInJsonListView(bool $includeInJsonListView): void
    {
        $this->includeInJsonListView = $includeInJsonListView;
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
     */
    public function setEntryTitle(bool $entryTitle): void
    {
        $this->entryTitle = $entryTitle;
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
     */
    public function setOrdering(int $ordering): void
    {
        $this->ordering = $ordering;
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
    public function setTranslatable($translatable)
    {
        $this->translatable = $translatable;
        return $this;
    }
}
