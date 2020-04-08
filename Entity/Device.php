<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class Device
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="devices", indexes={@ORM\Index(name="state_and_notifications", columns={"token_state", "push_notifications"})})
 * @ORM\HasLifecycleCallbacks
 */
class Device implements ApiEntityInterface
{
	use ApiEntityTrait;

	// Custom error messages
	public const DEVICE_ALREADY_REGISTERED = [422, 22, 'This device is already registered'];
	public const MISSING_APNS_OR_FIREBASE_TOKEN = [422, 23, 'Either the firebaseToken or the apnsToken should be provided'];

	/**
	 * @ORM\Id
	 * @ORM\Column(type="string", unique=true)
	 * @Groups({"Device", "PushNotificationDetailed"})
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $application;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\User", inversedBy="devices")
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     * @Groups({"Device"})
     */
    private $user;

	/**
	 * @ORM\Column(type="string", nullable=true)
	 * @Groups({"Device"})
	 */
	private $firebaseToken;

	/**
	 * @ORM\Column(type="string", nullable=true)
	 * @Groups({"Device"})
	 */
	private $apnsToken;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $name;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $model;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $manufacturer;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $platform;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $osVersion;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $appVersion;

	/**
	 * @ORM\Column(type="boolean")
	 * @Groups({"Device"})
	 */
	private $testDevice = false;

	/**
	 * @ORM\Column(type="boolean")
	 * @Groups({"Device"})
	 */
	private $tokenState = true;

	/**
	 * @ORM\Column(type="boolean")
	 * @Groups({"Device"})
	 */
	private $pushNotifications = true;

	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 * @Groups({"Device"})
	 */
	private $lastLogin;

	/**
	 * @ORM\Column(type="string")
	 * @Groups({"Device"})
	 */
	private $language;

	/**
	 * @ORM\Column(type="json_array", nullable=true)
	 */
	private $extraData;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\PushNotification\Recipient", mappedBy="device")
	 */
	private $pushNotificationRecipients;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Device\DeviceSegment", mappedBy="device")
     */
    private $deviceSegments;

	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		$this->id = Uuid::uuid1()->toString();
	}

	/**
	 * @return string|null
	 */
	public function getId(): ?string
	{
		return $this->id;
	}

	/**
	 * @param Application $application
	 */
	public function setApplication(Application $application): void
	{
		$this->application = $application;
	}

	/**
	 * @return Application
	 */
	public function getApplication(): Application
	{
		return $this->application;
	}

	/**
	 * @return User|null
	 */
	public function getUser(): ?User
	{
		return $this->user;
	}

	/**
	 * @param null|User $user
	 */
	public function setUser(?User $user): void
	{
		$this->user = $user;
	}

	/**
	 * @return string
	 */
	public function getFirebaseToken(): ?string
	{
		return $this->firebaseToken;
	}

	/**
	 * @param null|string $firebaseToken
	 */
	public function setFirebaseToken(?string $firebaseToken): void
	{
		$this->firebaseToken = $firebaseToken;
	}

	/**
	 * @return string
	 */
	public function getApnsToken(): ?string
	{
		return $this->apnsToken;
	}

	/**
	 * @param null|string $apnsToken
	 */
	public function setApnsToken(?string $apnsToken): void
	{
		$this->apnsToken = $apnsToken;
	}

	/**
	 * @return string
	 */
	public function getName(): string
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
	 * @return string
	 */
	public function getModel(): string
	{
		return $this->model;
	}

	/**
	 * @param string $model
	 */
	public function setModel($model): void
	{
		$this->model = $model;
	}


	/**
	 * @return string
	 */
	public function getManufacturer(): string
	{
		return $this->manufacturer;
	}


	/**
	 * @param string $manufacturer
	 */
	public function setManufacturer($manufacturer): void
	{
		$this->manufacturer = $manufacturer;
	}


	/**
	 * @return string
	 */
	public function getPlatform(): string
	{
		return $this->platform;
	}


	/**
	 * @param string $platform
	 */
	public function setPlatform(string $platform): void
	{
		$this->platform = $platform;
	}


	/**
	 * @return string
	 */
	public function getOsVersion(): string
	{
		return $this->osVersion;
	}


	/**
	 * @param string $osVersion
	 */
	public function setOsVersion(string $osVersion): void
	{
		$this->osVersion = $osVersion;
	}


	/**
	 * @return string
	 */
	public function getAppVersion(): string
	{
		return $this->appVersion;
	}


	/**
	 * @param string $appVersion
	 */
	public function setAppVersion(string $appVersion): void
	{
		$this->appVersion = $appVersion;
	}

	/**
	 * @return bool
	 */
	public function getTestDevice(): bool
	{
		return $this->testDevice;
	}

	/**
	 * @param bool $testDevice
	 */
	public function setTestDevice(bool $testDevice): void
	{
		$this->testDevice = $testDevice;
	}

	/**
	 * @return bool
	 */
	public function getTokenState(): bool
	{
		return $this->tokenState;
	}

	/**
	 * @param bool $tokenState
	 */
	public function setTokenState(bool $tokenState): void
	{
		$this->tokenState = $tokenState;
	}

	/**
	 * @return bool
	 */
	public function getPushNotifications(): bool
	{
		return $this->pushNotifications;
	}

	/**
	 * @param bool $pushNotifications
	 */
	public function setPushNotifications(bool $pushNotifications): void
	{
		$this->pushNotifications = $pushNotifications;
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
	 * @return string
	 */
	public function getLanguage(): string
	{
		return $this->language;
	}

	/**
	 * @param string $language
	 */
	public function setLanguage(string $language): void
	{
		$this->language = $language;
	}

	/**
	 * @return array|null
	 */
	public function getExtraData(): ?array
	{
		return $this->extraData;
	}

	/**
	 * Get meta data of the device, specially created for the json serializer
	 *
	 * @return array
	 *
	 * @Groups({"Device"})
	 */
	public function getMetaData(): array
	{
		return (array)$this->extraData;
	}

	/**
	 * @param array|object|null $extraData
	 */
	public function setExtraData($extraData): void
	{
		$this->extraData = $extraData;
	}

	/**
	 * @return DoctrineCollection
	 */
	public function getPushNotificationRecipients(): DoctrineCollection
	{
		return $this->pushNotificationRecipients;
	}

    /**
     * @return mixed
     */
    public function getDeviceSegments()
    {
        return $this->deviceSegments;
    }
}
