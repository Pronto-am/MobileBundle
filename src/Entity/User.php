<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class User
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @ORM\HasLifecycleCallbacks
 */
class User extends TimestampedEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     *
     * @Groups({"TimestampedWithUserEntity"})
     */
    private ?int $id = null;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Customer")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private ?Customer $customer;

    /**
     * @ORM\Column(type="string")
     *
     * @Groups({"TimestampedWithUserEntity"})
     */
    private string $firstName;

    /**
     * @ORM\Column(type="string", nullable=true)
     *
     * @Groups({"TimestampedWithUserEntity"})
     */
    private ?string $insertion = null;

    /**
     * @ORM\Column(type="string")
     *
     * @Groups({"TimestampedWithUserEntity"})
     */
    private string $lastName;

    /**
     * @ORM\Column(type="string", unique=true)
     */
    private string $email;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $password = null;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $activationToken = null;

    /**
     * A non-persisted field that's used to create the encoded password.
     */
    private ?string $plainPassword = null;

    /**
     * @ORM\Column(type="json_array")
     */
    private array $roles = [];

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\PushNotification", mappedBy="sentBy")
     */
    private DoctrineCollection $pushNotifications;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\User\UserLogin", mappedBy="user")
     * @ORM\OrderBy({"date" = "DESC"})
     */
    private DoctrineCollection $logins;

    /**
     * @ORM\PrePersist
     * @throws Exception
     */
    public function onPrePersist(): void
    {
        parent::onPrePersist();

        $this->activationToken = Uuid::uuid1()->toString();
    }

    public function getId(): ?int
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

    public function getInsertion(): ?string
    {
        return $this->insertion;
    }

    public function setInsertion(?string $insertion): void
    {
        $this->insertion = $insertion;
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
     * @Groups({"TimestampedWithUserEntity"})
     */
    public function getFullName(): string
    {
        return empty($this->insertion) ? $this->firstName . ' ' . $this->lastName : $this->firstName . ' ' . $this->insertion . ' ' . $this->lastName;
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

    public function setPassword(?string $password): void
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

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(Customer $customer): void
    {
        $this->customer = $customer;
    }

    public function getActivationToken(): string
    {
        return $this->activationToken;
    }

    public function setActivationToken(?string $activationToken): void
    {
        $this->activationToken = $activationToken;
    }

    public function getPushNotifications(): DoctrineCollection
    {
        return $this->pushNotifications;
    }

    public function getLogins(): DoctrineCollection
    {
        return $this->logins;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;

        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }

        return $roles;
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    public function addRole(string $role): void
    {
        if (!in_array($role, $this->roles)) {
            array_push($this->roles, $role);
        }
    }

    public function removeRole(string $role): void
    {
        foreach ($this->roles as $key => $value) {
            if ($role === $value) {
                unset($this->roles[$key]);
                break;
            }
        }
    }

    public function hasRole(string $role): bool
    {
        return in_array($role, $this->roles);
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
}
