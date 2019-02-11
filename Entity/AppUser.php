<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class AppUser
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="app_users")
 */
class AppUser extends TimestampedEntity implements UserInterface, ApiEntityInterface
{
	use ApiEntityTrait;

	public const USER_ALREADY_REGISTERED = [409, 1, 'This user is already registered'];
	public const USER_NOT_ACTIVATED = [400, 2, 'The users\' account hasn\'t been activated yet'];
	public const EMAIL_ADDRESS_ALREADY_EXISTS = [409, 3, 'An account with the provided email address already exists'];


	/**
	 * @ORM\Id
	 * @ORM\Column(type="string", unique=true)
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	private $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $application;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	private $firstName;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	private $lastName;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	private $email;


	/**
	 * @ORM\Column(type="string")
	 */
	private $password;


	/**
	 * A non-persisted field that's used to create the encoded password.
	 *
	 * @var string
	 */
	private $plainPassword;


	/**
	 * @ORM\Column(type="boolean")
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	private $activated = false;


	/**
	 * @ORM\Column(type="string")
	 */
	private $activationToken;


	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	private $lastLogin;


	/**
	 * @ORM\Column(type="json_array", nullable=true)
	 */
	private $extraData;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Device", mappedBy="appUser")
	 */
	private $devices;


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		parent::onPrePersist();

		$this->id = Uuid::uuid1()->toString();

		$this->activationToken = base64_encode(Uuid::uuid1()->toString() . '-' . $this->email);
	}


	/**
	 * @return string
	 */
	public function getId(): string
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
	 * @Groups({"AppUser"})
	 */
	public function getFullName(): string
	{
		return $this->firstName . ' ' . $this->lastName;
	}


	/**
	 * @return string
	 */
	public function getEmail(): string
	{
		return $this->email;
	}


	/**
	 * @param string $email
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
	 * @param string $password
	 */
	public function setPassword(string $password): void
	{
		$this->password = $password;
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
	 * @return string|null
	 */
	public function getPlainPassword(): ?string
	{
		return $this->plainPassword;
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
	 * @return string
	 */
	public function getActivationToken(): string
	{
		return $this->activationToken;
	}


	/**
	 * @param string $activationToken
	 */
	public function setActivationToken(string $activationToken): void
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
	 * @param DateTime $lastLogin
	 */
	public function setLastLogin(DateTime $lastLogin): void
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
	 * @param array $extraData
	 */
	public function setExtraData(array $extraData): void
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
		return ['ROLE_USER'];
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
		//
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
}