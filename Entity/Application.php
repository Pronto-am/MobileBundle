<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use FOS\OAuthServerBundle\Entity\Client;
use Symfony\Component\Validator\Constraints as Assert;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


/**
 * Class Application
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\ApplicationRepository")
 * @ORM\Table(name="applications")
 * @ORM\HasLifecycleCallbacks
 */
class Application extends Client implements ApiEntityInterface
{
	use ApiEntityTrait;


	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 */
	protected $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Customer")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $customer;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $name;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $label;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $color;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 * @Assert\NotBlank()
	 */
	private $androidBundleIdentifier;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 * @Assert\NotBlank()
	 */
	private $iosBundleIdentifier;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $defaultLanguage;


	/**
	 * @ORM\Column(type="json_array")
	 * @Assert\NotBlank()
	 */
	private $availableLanguages;


	/**
	 * @ORM\Column(type="datetime")
	 */
	private $createdAt;


	/**
	 * @ORM\Column(type="datetime")
	 */
	private $updatedAt;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Application\ApplicationPlugin", mappedBy="application")
	 */
	private $applicationPlugins;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Application\Version", mappedBy="application")
	 */
	private $applicationVersions;


	/**
	 * Application constructor.
	 */
	public function __construct()
	{
		parent::__construct();

		$this->applicationPlugins = new ArrayCollection();
		$this->applicationVersions = new ArrayCollection();
	}


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 */
	public function onPrePersist() {
		$this->createdAt = new \DateTime();
		$this->updatedAt = new \DateTime();
	}


	/**
	 * Triggered on pre update
	 *
	 * @ORM\PreUpdate
	 */
	public function onPreUpdate() {
		$this->updatedAt = new \DateTime();
	}


	/**
	 * @return mixed
	 */
	public function getCustomer()
	{
		return $this->customer;
	}


	/**
	 * @param mixed $customer
	 */
	public function setCustomer($customer): void
	{
		$this->customer = $customer;
	}


	/**
	 * @return mixed
	 */
	public function getName()
	{
		return $this->name;
	}


	/**
	 * @param mixed $name
	 */
	public function setName($name): void
	{
		$this->name = $name;
	}


	/**
	 * @return mixed
	 */
	public function getLabel()
	{
		return $this->label;
	}


	/**
	 * @param mixed $label
	 */
	public function setLabel($label): void
	{
		$this->label = $label;
	}


	/**
	 * @return mixed
	 */
	public function getApplicationVersions()
	{
		return $this->applicationVersions;
	}


	/**
	 * @return mixed
	 */
	public function getColor()
	{
		return $this->color;
	}


	/**
	 * @param mixed $color
	 */
	public function setColor($color): void
	{
		$this->color = $color;
	}


	/**
	 * @return mixed
	 */
	public function getAndroidBundleIdentifier()
	{
		return $this->androidBundleIdentifier;
	}


	/**
	 * @param mixed $androidBundleIdentifier
	 */
	public function setAndroidBundleIdentifier($androidBundleIdentifier): void
	{
		$this->androidBundleIdentifier = $androidBundleIdentifier;
	}


	/**
	 * @return mixed
	 */
	public function getIosBundleIdentifier()
	{
		return $this->iosBundleIdentifier;
	}


	/**
	 * @param mixed $iosBundleIdentifier
	 */
	public function setIosBundleIdentifier($iosBundleIdentifier): void
	{
		$this->iosBundleIdentifier = $iosBundleIdentifier;
	}


	/**
	 * @return mixed
	 */
	public function getDefaultLanguage()
	{
		return $this->defaultLanguage;
	}


	/**
	 * @param mixed $defaultLanguage
	 */
	public function setDefaultLanguage($defaultLanguage): void
	{
		$this->defaultLanguage = $defaultLanguage;
	}


	/**
	 * @return mixed
	 */
	public function getAvailableLanguages()
	{
		return $this->availableLanguages;
	}


	/**
	 * @param mixed $availableLanguages
	 */
	public function setAvailableLanguages($availableLanguages): void
	{
		$this->availableLanguages = $availableLanguages;
	}


	/**
	 * @return mixed
	 */
	public function getCreatedAt()
	{
		return $this->createdAt;
	}


	/**
	 * @param mixed $createdAt
	 */
	public function setCreatedAt($createdAt): void
	{
		$this->createdAt = $createdAt;
	}


	/**
	 * @return mixed
	 */
	public function getUpdatedAt()
	{
		return $this->updatedAt;
	}


	/**
	 * @param mixed $updatedAt
	 */
	public function setUpdatedAt($updatedAt): void
	{
		$this->updatedAt = $updatedAt;
	}


	/**
	 * @return mixed
	 */
	public function getApplicationPlugins()
	{
		return $this->applicationPlugins;
	}
}