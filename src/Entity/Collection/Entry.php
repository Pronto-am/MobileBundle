<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Collection;

use Doctrine\ORM\Mapping as ORM;
use Exception;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\TimestampedWithUserEntity;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class Entry
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'collection_entries')]
#[ORM\Index(name: 'active_entries_by_collection', columns: ['collection_id', 'active'])]
#[ORM\Entity(repositoryClass: 'Pronto\MobileBundle\Repository\Collection\EntryRepository')]
#[ORM\HasLifecycleCallbacks]
class Entry extends TimestampedWithUserEntity implements ApiEntityInterface
{
    use ApiEntityTrait;

    
    #[ORM\Id]
    #[ORM\Column(type: 'string', unique: true)]
    #[Groups(['Entry'])]
    private $id;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Collection', inversedBy: 'entries')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $collection;

    
    #[ORM\Column(type: 'json')]
    #[Groups(['Entry'])]
    private $data;

    #[ORM\Column(type: 'boolean')]
    private $active = true;

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
     * @return Collection
     */
    public function getCollection(): Collection
    {
        return $this->collection;
    }

    /**
     * @param Collection $collection
     */
    public function setCollection(Collection $collection)
    {
        $this->collection = $collection;
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return $this->data ?? [];
    }

    /**
     * @param array $data
     */
    public function setData(array $data)
    {
        $this->data = $data;
    }

    /**
     * @return bool
     */
    public function getActive(): bool
    {
        return $this->active;
    }

    /**
     * @param bool $active
     */
    public function setActive(bool $active)
    {
        $this->active = $active;
    }
}
