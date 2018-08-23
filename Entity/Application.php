<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\Client;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Validator\Constraints as Assert;


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
	 * @return string|null
	 */
	public function getLabel(): ?string
	{
		return $this->label;
	}


	/**
	 * @param string $label
	 */
	public function setLabel(string $label): void
	{
		$this->label = $label;
	}


	/**
	 * @return DoctrineCollection
	 */
	public function getApplicationVersions(): DoctrineCollection
	{
		return $this->applicationVersions;
	}


	/**
	 * @return string
	 */
	public function getColor(): string
	{
		return $this->color;
	}


	/**
	 * @param string $color
	 */
	public function setColor(string $color): void
	{
		$this->color = $color;
	}


	/**
	 * @return string|null
	 */
	public function getAndroidBundleIdentifier(): ?string
	{
		return $this->androidBundleIdentifier;
	}


	/**
	 * @param string $androidBundleIdentifier
	 */
	public function setAndroidBundleIdentifier(string $androidBundleIdentifier): void
	{
		$this->androidBundleIdentifier = $androidBundleIdentifier;
	}


	/**
	 * @return string|null
	 */
	public function getIosBundleIdentifier(): ?string
	{
		return $this->iosBundleIdentifier;
	}


	/**
	 * @param string $iosBundleIdentifier
	 */
	public function setIosBundleIdentifier(string $iosBundleIdentifier): void
	{
		$this->iosBundleIdentifier = $iosBundleIdentifier;
	}


	/**
	 * @return string
	 */
	public function getDefaultLanguage(): string
	{
		return $this->defaultLanguage;
	}


	/**
	 * @param string $defaultLanguage
	 */
	public function setDefaultLanguage(string $defaultLanguage): void
	{
		$this->defaultLanguage = $defaultLanguage;
	}


	/**
	 * @return array
	 */
	public function getAvailableLanguages(): array
	{
		return $this->availableLanguages;
	}


	/**
	 * @param array $availableLanguages
	 */
	public function setAvailableLanguages(array $availableLanguages): void
	{
		$this->availableLanguages = $availableLanguages;
	}


	/**
	 * @return DateTime
	 */
	public function getCreatedAt(): DateTime
	{
		return $this->createdAt;
	}


	/**
	 * @param string $createdAt
	 */
	public function setCreatedAt(string $createdAt): void
	{
		$this->createdAt = $createdAt;
	}


	/**
	 * @return DateTime
	 */
	public function getUpdatedAt(): DateTime
	{
		return $this->updatedAt;
	}


	/**
	 * @param string $updatedAt
	 */
	public function setUpdatedAt(string $updatedAt): void
	{
		$this->updatedAt = $updatedAt;
	}


	/**
	 * @return DoctrineCollection
	 */
	public function getApplicationPlugins(): DoctrineCollection
	{
		return $this->applicationPlugins;
	}
}