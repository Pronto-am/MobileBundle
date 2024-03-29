<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\AppUser;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use Pronto\MobileBundle\Entity\AppUser;
use Ramsey\Uuid\Uuid;

/**
 * Class PasswordReset
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'app_users_password_resets')]
#[ORM\Entity]
#[ORM\HasLifecycleCallbacks]
class PasswordReset
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', unique: true)]
    private $token;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\AppUser')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private $user;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    /**
     * PasswordReset constructor.
     * @param AppUser $user
     */
    public function __construct(AppUser $user)
    {
        $this->user = $user;
    }

    /**
     * Triggered on pre persist
     *
     * @throws Exception
     */
    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->token = Uuid::uuid1()->toString();
        $this->createdAt = new DateTime();
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @return AppUser
     */
    public function getUser(): AppUser
    {
        return $this->user;
    }

    /**
     * @return DateTime
     */
    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }
}
