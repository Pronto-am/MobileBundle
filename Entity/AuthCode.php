<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\AuthCode as BaseAuthCode;
use Ramsey\Uuid\Uuid;

/**
 * @ORM\Entity
 * @ORM\Table(name="authorization_codes")
 * @ORM\HasLifecycleCallbacks
 */
class AuthCode extends BaseAuthCode
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="string", unique=true, length=36)
	 */
	protected $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(nullable=false)
	 */
	protected $client;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\AppUser")
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
		$this->id = Uuid::uuid1()->toString();
	}
}