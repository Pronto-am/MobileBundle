<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\AccessToken as BaseAccessToken;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class AccessToken
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="access_tokens")
 * @ORM\HasLifecycleCallbacks
 */
class AccessToken extends BaseAccessToken
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", unique=true)
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\OAuthClient")
     * @ORM\JoinColumn(nullable=true)
     */
    protected $client;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\User")
     * @ORM\JoinColumn(nullable=true, onDelete="cascade")
     */
    protected $user;

    /**
     * Triggered on pre persist
     *
     * @ORM\PrePersist
     * @throws \Exception
     */
    public function onPrePersist(): void
    {
        $this->id = Uuid::uuid4()->toString();
    }

    /**
     * @param UserInterface|null $user
     */
    public function setUser(?UserInterface $user)
    {
        $this->user = $user;
    }
}
