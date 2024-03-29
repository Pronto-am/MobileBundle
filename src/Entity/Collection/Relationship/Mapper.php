<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Collection\Relationship;

use Doctrine\ORM\Mapping as ORM;
use Exception;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Entry;
use Pronto\MobileBundle\Entity\TimestampedEntity;
use Ramsey\Uuid\Uuid;

/**
 * Class Type
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'collection_relationship_mappers')]
#[ORM\Index(name: 'entry_left_id', columns: ['entry_left_id'])]
#[ORM\Entity(repositoryClass: 'Pronto\MobileBundle\Repository\Collection\Relationship\MapperRepository')]
#[ORM\HasLifecycleCallbacks]
class Mapper extends TimestampedEntity
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', unique: true)]
    private $id;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Collection\Entry')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $entryLeft;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Collection\Entry')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $entryRight;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Collection')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $relatedCollection;

    /**
     * Triggered on pre persist
     *
     * @throws Exception
     */
    #[ORM\PrePersist]
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
     * @return Entry
     */
    public function getEntryLeft(): Entry
    {
        return $this->entryLeft;
    }

    /**
     * @param Entry $entryLeft
     */
    public function setEntryLeft(Entry $entryLeft): void
    {
        $this->entryLeft = $entryLeft;
    }

    /**
     * @return Entry
     */
    public function getEntryRight(): Entry
    {
        return $this->entryRight;
    }

    /**
     * @param Entry $entryRight
     */
    public function setEntryRight(Entry $entryRight): void
    {
        $this->entryRight = $entryRight;
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
}
