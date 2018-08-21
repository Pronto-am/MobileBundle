<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class User
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @UniqueEntity("email")
 * @ORM\HasLifecycleCallbacks
 */
class User extends TimestampedEntity implements UserInterface
{
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
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
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
	 * @Assert\NotBlank()
	 *
	 * @Groups({"TimestampedWithUserEntity"})
	 */
	private $lastName;


	/**
	 * @ORM\Column(type="string", unique=true)
	 * @Assert\NotBlank()
	 * @Assert\Email()
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
	 * A non-persisted field that's used to create the encoded password.
	 *
	 * @var string
	 */
	private $plainPassword;


	/**
	 * @ORM\Column(type="json_array")
	 */
	private $roles = [];


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

		$this->activationToken = Uuid::uuid1()->toString();
	}


	/**
	 * @return int
	 */
	public function getId(): int
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
	 * @param string $insertion
	 */
	public function setInsertion(string $insertion): void
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
	 * @param string $password
	 */
	public function setPassword(string $password): void
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
	 * Get the encoded activation token
	 *
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
	 * @return ArrayCollection
	 */
	public function getPushNotifications(): ArrayCollection
	{
		return $this->pushNotifications;
	}


	/**
	 * @return ArrayCollection
	 */
	public function getLogins(): ArrayCollection
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
}