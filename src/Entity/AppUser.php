<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use League\OAuth2\Server\Entities\UserEntityInterface;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="app_users")
 */
class AppUser extends TimestampedEntity implements UserInterface, ApiEntityInterface, PasswordAuthenticatedUserInterface, UserEntityInterface
{
    use ApiEntityTrait;

    /**
     * @ORM\Id
     * @ORM\Column(type="string", unique=true)
     *
     * @Groups({"AppUser", "Device"})
     */
    private ?string $id;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private Application $application;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     *
     * @Groups({"AppUser", "Device"})
     */
    private string $firstName;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     *
     * @Groups({"AppUser", "Device"})
     */
    private string $lastName;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     * @Assert\Email()
     *
     * @Groups({"AppUser", "Device"})
     */
    private string $email;

    /**
     * @ORM\Column(type="string")
     */
    private ?string $password;

    private ?string $plainPassword;

    /**
     * @ORM\Column(type="boolean")
     *
     * @Groups({"AppUser", "Device"})
     */
    private bool $activated = false;

    /**
     * @ORM\Column(type="string")
     */
    private string $activationToken;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"AppUser", "Device"})
     */
    private ?DateTime $lastLogin;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private ?array $extraData;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Device", mappedBy="appUser")
     */
    private DoctrineCollection $devices;

    public static function getSerializerCallbacks(): array
    {
        return [
            'extraData' => function ($extraData) {
                return !empty($extraData) ? $extraData : null;
            }
        ];
    }

    /**
     * @ORM\PrePersist
     * @throws Exception
     */
    public function onPrePersist(): void
    {
        parent::onPrePersist();

        $this->id = Uuid::uuid1()->toString();

        $this->activationToken = base64_encode(Uuid::uuid1()->toString() . '-' . $this->email);
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @Groups({"AppUser"})
     */
    public function getFullName(): string
    {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;

        $this->password = null;
    }

    public function getApplication(): Application
    {
        return $this->application;
    }

    public function setApplication(Application $application): void
    {
        $this->application = $application;
    }

    public function getActivated(): bool
    {
        return $this->activated;
    }

    public function setActivated(bool $activated): void
    {
        $this->activated = $activated;
    }

    public function getActivationToken(): string
    {
        return $this->activationToken;
    }

    public function setActivationToken(string $activationToken): void
    {
        $this->activationToken = $activationToken;
    }

    public function getLastLogin(): ?DateTime
    {
        return $this->lastLogin;
    }

    public function setLastLogin(?DateTime $lastLogin): void
    {
        $this->lastLogin = $lastLogin;
    }

    /**
     * @Groups({"AppUser", "Device"})
     */
    public function getExtraData(): ?array
    {
        return (array) $this->extraData;
    }

    public function setExtraData(?array $extraData): void
    {
        $this->extraData = $extraData;
    }

    public function getDevices(): DoctrineCollection
    {
        return $this->devices;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function getUsername(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getIdentifier()
    {
        return $this->email;
    }
}
