<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\AccessToken as BaseAccessToken;
use Ramsey\Uuid\Uuid;

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
	 * @ORM\Column(type="string")
	 */
	protected $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(nullable=false)
	 */
	protected $client;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\AppUser")
	 * @ORM\JoinColumn(onDelete="cascade")
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