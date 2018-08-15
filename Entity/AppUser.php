<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Utils\ErrorResponse;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


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

	public const USER_ALREADY_REGISTERED = [409, 'This user is already registered'];
	public const USER_NOT_ACTIVATED = [400, 'The users\' account hasn\'t been activated yet'];
	public const EMAIL_ADDRESS_ALREADY_EXISTS = [409, 'An account with the provided email address already exists'];


	/**
	 * @ORM\Id
	 * @ORM\Column(type="string")
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
	 * @ORM\Column(type="string", unique=true)
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
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
	}


	/**
	 * @return mixed
	 */
	public function getFirstName()
	{
		return $this->firstName;
	}


	/**
	 * @param mixed $firstName
	 */
	public function setFirstName($firstName): void
	{
		$this->firstName = $firstName;
	}


	/**
	 * @return mixed
	 */
	public function getLastName()
	{
		return $this->lastName;
	}


	/**
	 * @param mixed $lastName
	 */
	public function setLastName($lastName): void
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
	 * @return mixed
	 */
	public function getEmail()
	{
		return $this->email;
	}


	/**
	 * @param mixed $email
	 */
	public function setEmail($email): void
	{
		$this->email = $email;
	}


	/**
	 * @return mixed
	 */
	public function getPassword()
	{
		return $this->password;
	}


	/**
	 * @param mixed $password
	 */
	public function setPassword($password): void
	{
		$this->password = $password;
	}


	/**
	 * @param $plainPassword
	 */
	public function setPlainPassword($plainPassword): void
	{
		$this->plainPassword = $plainPassword;

		$this->password = null;
	}


	/**
	 * @return string
	 */
	public function getPlainPassword(): string
	{
		return $this->plainPassword;
	}


	/**
	 * @return mixed
	 */
	public function getApplication()
	{
		return $this->application;
	}


	/**
	 * @param mixed $application
	 */
	public function setApplication($application): void
	{
		$this->application = $application;
	}


	/**
	 * @return mixed
	 */
	public function getActivated()
	{
		return $this->activated;
	}


	/**
	 * @param mixed $activated
	 */
	public function setActivated($activated): void
	{
		$this->activated = $activated;
	}


	/**
	 * @return mixed
	 */
	public function getActivationToken()
	{
		return $this->activationToken;
	}


	/**
	 * @param mixed $activationToken
	 */
	public function setActivationToken($activationToken): void
	{
		$this->activationToken = $activationToken;
	}


	/**
	 * @return mixed
	 */
	public function getLastLogin()
	{
		return $this->lastLogin;
	}


	/**
	 * @param mixed $lastLogin
	 */
	public function setLastLogin($lastLogin): void
	{
		$this->lastLogin = $lastLogin;
	}


	/**
	 * @return mixed
	 *
	 * @Groups({"AppUser", "Device"})
	 */
	public function getExtraData()
	{
		return (array)$this->extraData;
	}


	/**
	 * @param mixed $extraData
	 */
	public function setExtraData($extraData): void
	{
		$this->extraData = $extraData;
	}


	/**
	 * @return mixed
	 *
	 */
	public function getDevices()
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
	public function getSalt()
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
	public function eraseCredentials()
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