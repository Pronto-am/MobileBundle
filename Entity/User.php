<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
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
class User extends TimestampedEntity implements UserInterface
{
    use ApiEntityTrait;

    public const USER_ALREADY_REGISTERED = [409, 1, 'This user is already registered'];
    public const USER_NOT_ACTIVATED = [400, 2, 'The users\' account hasn\'t been activated yet'];
    public const EMAIL_ADDRESS_ALREADY_EXISTS = [409, 3, 'An account with the provided email address already exists'];

    /**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Customer")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $customer;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private $application;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\AppUser")
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     */
    private $formerAppUser;

	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $firstName;

	/**
	 * @ORM\Column(type="string", nullable=true)
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $insertion;

	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $lastName;

	/**
	 * @ORM\Column(type="string")
	 */
	private $email;

	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $password;

	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $activationToken;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"User", "Device"})
     */
    private $activated = true;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"User", "Device"})
     */
    private $appUser = true;

	/**
	 * @var string
	 */
	private $plainPassword;

	/**
	 * @ORM\Column(type="json_array")
	 */
	private $roles = [];

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"User", "Device"})
     */
    private $lastLogin;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private $extraData;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Device", mappedBy="user")
     */
    private $devices;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\PushNotification", mappedBy="sentBy")
	 */
	private $pushNotifications;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\User\UserLogin", mappedBy="user")
	 * @ORM\OrderBy({"date" = "DESC"})
	 */
	private $logins;

	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		parent::onPrePersist();

        $this->activationToken = base64_encode(Uuid::uuid4()->toString() . '-' . $this->email);
	}

	/**
	 * @return int|null
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * @return string
	 */
	public function getFirstName(): string
	{
		return $this->firstName;
	}

	/**
	 * @param string $firstName
	 */
	public function setFirstName(string $firstName): void
	{
		$this->firstName = $firstName;
	}

	/**
	 * @return string|null
	 */
	public function getInsertion(): ?string
	{
		return $this->insertion;
	}

	/**
	 * @param string|null $insertion
	 */
	public function setInsertion(?string $insertion): void
	{
		$this->insertion = $insertion;
	}

	/**
	 * @return string
	 */
	public function getLastName(): string
	{
		return $this->lastName;
	}

	/**
	 * @param string $lastName
	 */
	public function setLastName(string $lastName): void
	{
		$this->lastName = $lastName;
	}

	/**
	 * Get the full name of the user
	 *
	 * @return string
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	public function getFullName(): string
	{
		return empty($this->insertion) ? $this->firstName . ' ' . $this->lastName : $this->firstName . ' ' . $this->insertion . ' ' . $this->lastName;
	}

	/**
	 * @return string
	 */
	public function getEmail(): string
	{
		return $this->email;
	}

	/**
	 * @param mixed $email
	 */
	public function setEmail(string $email): void
	{
		$this->email = $email;
	}

	/**
	 * @return string
	 */
	public function getPassword(): string
	{
		return $this->password;
	}

	/**
	 * @param null|string $password
	 */
	public function setPassword(?string $password): void
	{
		$this->password = $password;
	}

	/**
	 * @return string
	 */
	public function getPlainPassword(): ?string
	{
		return $this->plainPassword;
	}

	/**
	 * @param string $plainPassword
	 */
	public function setPlainPassword(string $plainPassword): void
	{
		$this->plainPassword = $plainPassword;

		$this->password = null;
	}

	/**
	 * @return Customer|null
	 */
	public function getCustomer(): ?Customer
	{
		return $this->customer;
	}

	/**
	 * @param Customer $customer
	 */
	public function setCustomer(Customer $customer): void
	{
		$this->customer = $customer;
	}

    /**
     * @return Application
     */
    public function getApplication(): Application
    {
        return $this->application;
    }

    /**
     * @param Application $application
     */
    public function setApplication(Application $application): void
    {
        $this->application = $application;
    }

    /**
     * @return bool
     */
    public function getActivated(): bool
    {
        return $this->activated;
    }

    /**
     * @param bool $activated
     */
    public function setActivated(bool $activated): void
    {
        $this->activated = $activated;
    }

    /**
     * @return bool
     */
    public function isAppUser(): bool
    {
        return $this->appUser;
    }

    /**
     * @param bool $appUser
     */
    public function setAppUser(bool $appUser): void
    {
        $this->appUser = $appUser;
    }

	/**
	 * Get the encoded activation token
	 *
	 * @return string
	 */
	public function getActivationToken(): string
	{
		return $this->activationToken;
	}

	/**
	 * @param null|string $activationToken
	 */
	public function setActivationToken(?string $activationToken): void
	{
		$this->activationToken = $activationToken;
	}

    /**
     * @return DateTime|null
     */
    public function getLastLogin(): ?DateTime
    {
        return $this->lastLogin;
    }

    /**
     * @param null|DateTime $lastLogin
     */
    public function setLastLogin(?DateTime $lastLogin): void
    {
        $this->lastLogin = $lastLogin;
    }

    /**
     * @return array|null
     *
     * @Groups({"AppUser", "Device"})
     */
    public function getExtraData(): ?array
    {
        return (array)$this->extraData;
    }

    /**
     * @param null|array $extraData
     */
    public function setExtraData(?array $extraData): void
    {
        $this->extraData = $extraData;
    }

    /**
     * @return DoctrineCollection
     */
    public function getDevices(): DoctrineCollection
    {
        return $this->devices;
    }

	/**
	 * @return DoctrineCollection
	 */
	public function getLogins(): DoctrineCollection
	{
		return $this->logins;
	}

	/**
	 * Returns the roles granted to the user.
	 *
	 * <code>
	 * public function getRoles()
	 * {
	 *     return array('ROLE_USER');
	 * }
	 * </code>
	 *
	 * Alternatively, the roles might be stored on a ``roles`` property,
	 * and populated in any number of different ways when the user object
	 * is created.
	 *
	 * @return array (Role|string)[] The user roles
	 */
	public function getRoles(): array
	{
		$roles = $this->roles;

		if (!in_array('ROLE_USER', $roles)) {
			$roles[] = 'ROLE_USER';
		}

		return $roles;
	}

	/**
	 * Set the roles of a user
	 *
	 * @param array $roles
	 */
	public function setRoles(array $roles): void
	{
		$this->roles = $roles;
	}

	/**
	 * Add a role to the user
	 *
	 * @param string $role
	 */
	public function addRole(string $role): void
	{
		if (!in_array($role, $this->roles)) {
			array_push($this->roles, $role);
		}
	}

	/**
	 * Remove a role from the user
	 *
	 * @param string $role
	 */
	public function removeRole(string $role): void
	{
		foreach ($this->roles as $key => $value) {
			if ($role === $value) {
				unset($this->roles[$key]);
				break;
			}
		}
	}

	/**
	 * Check if a user has a specific role
	 *
	 * @param string $role
	 * @return bool
	 */
	public function hasRole(string $role): bool
	{
		return in_array($role, $this->roles);
	}

	/**
	 * Returns the salt that was originally used to encode the password.
	 *
	 * This can return null if the password was not encoded using a salt.
	 *
	 * @return string|null The salt
	 */
	public function getSalt(): ?string
	{
		return null;
	}

	/**
	 * Returns the username used to authenticate the user.
	 *
	 * @return string The username
	 */
	public function getUsername(): string
	{
		return $this->email;
	}

	/**
	 * Removes sensitive data from the user.
	 *
	 * This is important if, at any given point, sensitive information like
	 * the plain-text password is stored on this object.
	 */
	public function eraseCredentials(): void
	{
		$this->plainPassword = null;
	}

    /**
     * Get the serializer callbacks
     *
     * @return array
     */
    public static function getSerializerCallbacks(): array
    {
        return [
            'extraData' => function ($extraData) {
                return !empty($extraData) ? $extraData : null;
            }
        ];
    }

    /**
     * @return mixed
     */
    public function getFormerAppUser()
    {
        return $this->formerAppUser;
    }

    /**
     * @param mixed $formerAppUser
     */
    public function setFormerAppUser(?AppUser $formerAppUser): void
    {
        $this->formerAppUser = $formerAppUser;
    }
}
