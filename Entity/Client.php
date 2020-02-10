<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\Client as BaseClient;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Application
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="oauth_clients")
 * @ORM\HasLifecycleCallbacks
 */
class Client extends BaseClient
{
	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 */
	protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     */
    private $application;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

	/**
	 * @return mixed
	 */
	public function getApplication()
	{
		return $this->application;
	}

    /**
     * @param Application|null $application
     */
	public function setApplication(?Application $application): void
	{
		$this->application = $application;
	}
}
