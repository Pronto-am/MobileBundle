<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class TimestampedWithUserEntity
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\MappedSuperclass]
#[ORM\HasLifecycleCallbacks]
abstract class TimestampedWithUserEntity
{
    
    #[ORM\Column(type: 'datetime')]
    #[Groups(['TimestampedWithUserEntity'])]
    private $createdAt;

    
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\User')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'set null')]
    #[Groups(['TimestampedWithUserEntity'])]
    private $createdBy;

    
    #[ORM\Column(type: 'datetime')]
    #[Groups(['TimestampedWithUserEntity'])]
    private $updatedAt;

    
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\User')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'set null')]
    #[Groups(['TimestampedWithUserEntity'])]
    private $updatedBy;

    /**
     * @return DateTime
     */
    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param DateTime $createdAt
     */
    public function setCreatedAt(DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return User|null
     */
    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    /**
     * @param null|User $createdBy
     */
    public function setCreatedBy(?User $createdBy): void
    {
        $this->createdBy = $createdBy;
    }

    /**
     * @return DateTime
     */
    public function getUpdatedAt(): DateTime
    {
        return $this->updatedAt;
    }

    /**
     * @param mixed $updatedAt
     */
    public function setUpdatedAt(DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return User|null
     */
    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }

    /**
     * @param null|User $updatedBy
     */
    public function setUpdatedBy(?User $updatedBy): void
    {
        $this->updatedBy = $updatedBy;
    }

    /**
     * Triggered on pre persist
     */
    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->createdAt = new DateTime();
        $this->updatedAt = new DateTime();
    }

    /**
     * Triggered on pre update
     */
    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new DateTime();
    }
}
