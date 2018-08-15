<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Pronto\MobileBundle\Traits\ApiEntityTrait;

/**
 * Class Device
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\DeviceRepository")
 * @ORM\Table(name="devices")
 * @ORM\HasLifecycleCallbacks
 */
class Device implements ApiEntityInterface
{
	use ApiEntityTrait;


	// Custom error messages
	public const MISSING_APNS_OR_FIREBASE_TOKEN = [422, 'Either the firebaseToken or the apnsToken should be provided'];
	public const DEVICE_ALREADY_REGISTERED = [422, 'This device is already registered'];


	/**
	 * @ORM\Id
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $application;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\AppUser", inversedBy="devices")
	 * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
	 *
	 * @Groups({"Device"})
	 */
	private $appUser;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 *
	 * @Groups({"Device"})
	 */
	private $firebaseToken;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 *
	 * @Groups({"Device"})
	 */
	private $apnsToken;


	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $name;


	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $model;


	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $manufacturer;


	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $platform;


	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $osVersion;


	/**
	 * @ORM\Column(type="string")
	 *
	 * @Groups({"Device"})
	 */
	private $appVersion;


	/**
	 * @ORM\Column(type="boolean")
	 *
	 * @Groups({"Device"})
	 */
	private $testDevice = false;


	/**
	 * @ORM\Column(type="boolean")
	 *
	 * @Groups({"Device"})
	 */
	private $tokenState = true;


	/**
	 * @ORM\Column(type="boolean")
	 *
	 * @Groups({"Device"})
	 */
	private $pushNotifications = true;


	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 *
	 * @Groups({"Device"})
	 */
	private $lastLogin;


	/**
	 * @ORM\Column(type="string")
	 *
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
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
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
	public function getApplication()
	{
		return $this->application;
	}


	/**
	 * @return mixed
	 */
	public function getAppUser()
	{
		return $this->appUser;
	}


	/**
	 * @param mixed $appUser
	 */
	public function setAppUser($appUser): void
	{
		$this->appUser = $appUser;
	}


	/**
	 * @return mixed
	 */
	public function getFirebaseToken()
	{
		return $this->firebaseToken;
	}


	/**
	 * @param mixed $firebaseToken
	 */
	public function setFirebaseToken($firebaseToken): void
	{
		$this->firebaseToken = $firebaseToken;
	}


	/**
	 * @return mixed
	 */
	public function getApnsToken()
	{
		return $this->apnsToken;
	}


	/**
	 * @param mixed $apnsToken
	 */
	public function setApnsToken($apnsToken): void
	{
		$this->apnsToken = $apnsToken;
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
	public function getModel()
	{
		return $this->model;
	}


	/**
	 * @param mixed $model
	 */
	public function setModel($model): void
	{
		$this->model = $model;
	}


	/**
	 * @return mixed
	 */
	public function getManufacturer()
	{
		return $this->manufacturer;
	}


	/**
	 * @param mixed $manufacturer
	 */
	public function setManufacturer($manufacturer): void
	{
		$this->manufacturer = $manufacturer;
	}


	/**
	 * @return mixed
	 */
	public function getPlatform()
	{
		return $this->platform;
	}


	/**
	 * @param mixed $platform
	 */
	public function setPlatform($platform): void
	{
		$this->platform = $platform;
	}


	/**
	 * @return mixed
	 */
	public function getOsVersion()
	{
		return $this->osVersion;
	}


	/**
	 * @param mixed $osVersion
	 */
	public function setOsVersion($osVersion): void
	{
		$this->osVersion = $osVersion;
	}


	/**
	 * @return mixed
	 */
	public function getAppVersion()
	{
		return $this->appVersion;
	}


	/**
	 * @param mixed $appVersion
	 */
	public function setAppVersion($appVersion): void
	{
		$this->appVersion = $appVersion;
	}


	/**
	 * @return mixed
	 */
	public function getTestDevice()
	{
		return $this->testDevice;
	}


	/**
	 * @param mixed $testDevice
	 */
	public function setTestDevice($testDevice): void
	{
		$this->testDevice = $testDevice;
	}


	/**
	 * @return mixed
	 */
	public function getTokenState()
	{
		return $this->tokenState;
	}


	/**
	 * @param mixed $tokenState
	 */
	public function setTokenState($tokenState): void
	{
		$this->tokenState = $tokenState;
	}


	/**
	 * @return mixed
	 */
	public function getPushNotifications()
	{
		return $this->pushNotifications;
	}


	/**
	 * @param mixed $pushNotifications
	 */
	public function setPushNotifications($pushNotifications): void
	{
		$this->pushNotifications = $pushNotifications;
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
	 */
	public function getLanguage()
	{
		return $this->language;
	}


	/**
	 * @param mixed $language
	 */
	public function setLanguage($language): void
	{
		$this->language = $language;
	}


	/**
	 * @return mixed
	 */
	public function getExtraData()
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
	 * @param mixed $extraData
	 */
	public function setExtraData($extraData): void
	{
		$this->extraData = $extraData;
	}


	/**
	 * @return mixed
	 */
	public function getPushNotificationRecipients()
	{
		return $this->pushNotificationRecipients;
	}
}