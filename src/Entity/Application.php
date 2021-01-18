<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\ApplicationRepository")
 * @ORM\Table(name="applications")
 * @ORM\HasLifecycleCallbacks
 */
class Application implements ApiEntityInterface
{
    use ApiEntityTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;
    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $randomId;
    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $secret;
    /**
     * @ORM\Column(type="array", nullable=true)
     */
    protected $redirectUris = [];
    /**
     * @ORM\Column(type="array", nullable=true)
     */
    protected $allowedGrantTypes = [];
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

    /*
     * The next properties are from the old FOS OAuth server
     */
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
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Application\ApplicationClient", mappedBy="application")
     */
    private $applicationClients;

    public function __construct()
    {
        $this->applicationPlugins = new ArrayCollection();
        $this->applicationVersions = new ArrayCollection();
        $this->applicationClients = new ArrayCollection();
    }

    /**
     * @ORM\PrePersist
     */
    public function onPrePersist()
    {
        $this->createdAt = new DateTime();
        $this->updatedAt = new DateTime();
    }

    /**
     * @ORM\PreUpdate
     */
    public function onPreUpdate()
    {
        $this->updatedAt = new DateTime();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getCustomer()
    {
        return $this->customer;
    }

    public function setCustomer($customer): void
    {
        $this->customer = $customer;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): void
    {
        $this->label = $label;
    }

    public function getApplicationVersions(): DoctrineCollection
    {
        return $this->applicationVersions;
    }

    public function getColor(): string
    {
        return $this->color;
    }

    public function setColor(string $color): void
    {
        $this->color = $color;
    }

    public function getAndroidBundleIdentifier(): ?string
    {
        return $this->androidBundleIdentifier;
    }

    public function setAndroidBundleIdentifier(?string $androidBundleIdentifier): void
    {
        $this->androidBundleIdentifier = $androidBundleIdentifier;
    }

    public function getIosBundleIdentifier(): ?string
    {
        return $this->iosBundleIdentifier;
    }

    public function setIosBundleIdentifier(?string $iosBundleIdentifier): void
    {
        $this->iosBundleIdentifier = $iosBundleIdentifier;
    }

    public function getDefaultLanguage(): string
    {
        return $this->defaultLanguage;
    }

    public function setDefaultLanguage(string $defaultLanguage): void
    {
        $this->defaultLanguage = $defaultLanguage;
    }

    public function getAvailableLanguages(): array
    {
        return $this->availableLanguages;
    }

    public function setAvailableLanguages(array $availableLanguages): void
    {
        $this->availableLanguages = $availableLanguages;
    }

    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(string $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getUpdatedAt(): DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(string $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    public function getApplicationPlugins(): DoctrineCollection
    {
        return $this->applicationPlugins;
    }

    public function getApplicationClients(): DoctrineCollection
    {
        return $this->applicationClients;
    }

    public function getSecret()
    {
        return $this->secret;
    }

    public function setSecret($secret): self
    {
        $this->secret = $secret;
        return $this;
    }

    public function getRedirectUris(): array
    {
        return $this->redirectUris;
    }

    public function setRedirectUris(array $redirectUris): self
    {
        $this->redirectUris = $redirectUris;
        return $this;
    }

    public function getAllowedGrantTypes(): array
    {
        return $this->allowedGrantTypes;
    }

    public function setAllowedGrantTypes(array $allowedGrantTypes): self
    {
        $this->allowedGrantTypes = $allowedGrantTypes;
        return $this;
    }

    public function getPublicId(): string
    {
        return sprintf('%s_%s', $this->id, $this->getRandomId());
    }

    public function getRandomId()
    {
        return $this->randomId;
    }

    public function setRandomId($randomId): self
    {
        $this->randomId = $randomId;
        return $this;
    }
}
