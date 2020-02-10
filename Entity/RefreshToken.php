<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\RefreshToken as BaseRefreshToken;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="refresh_tokens")
 * @ORM\HasLifecycleCallbacks
 */
class RefreshToken extends BaseRefreshToken
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="string", unique=true)
	 */
	protected $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(nullable=false)
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
