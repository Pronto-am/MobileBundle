<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Collection\Relationship;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Type
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'collection_relationship_types')]
#[ORM\Entity]
class Type
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string')]
    private $name;

    #[ORM\Column(type: 'boolean')]
    private $hasMany = false;

    #[ORM\Column(type: 'boolean')]
    private $canBeEmpty = false;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
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
     * @return bool
     */
    public function hasMany(): bool
    {
        return $this->hasMany;
    }

    /**
     * @param bool $hasMany
     */
    public function setHasMany(bool $hasMany): void
    {
        $this->hasMany = $hasMany;
    }

    /**
     * @return bool
     */
    public function canBeEmpty(): bool
    {
        return $this->canBeEmpty;
    }

    /**
     * @param bool $canBeEmpty
     */
    public function setCanBeEmpty(bool $canBeEmpty): void
    {
        $this->canBeEmpty = $canBeEmpty;
    }
}
