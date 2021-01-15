<?php

namespace Pronto\MobileBundle\Entity\User;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\User;
use Ramsey\Uuid\Uuid;


/**
 * Class UserLogin
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="user_logins")
 * @ORM\HasLifecycleCallbacks
 */
class UserLogin
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", unique=true)
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\User", inversedBy="logins")
	 * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private $user;


	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 */
	private $date;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $browserName;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $platform;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $version;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $aolVersion;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $isMobile = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $isTablet = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $isFacebook = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $isChromeFrame = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $isRobot = false;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $userAgent;


	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		$this->id = Uuid::uuid1()->toString();
		$this->date = new DateTime();
	}


    /**
     * @return string|null
     */
    public function getId(): ?string
    {
        return $this->id;
    }


	/**
	 * @return User
	 */
	public function getUser(): User
	{
		return $this->user;
	}


	/**
	 * @param User $user
	 */
	public function setUser(User $user): void
	{
		$this->user = $user;
	}


	/**
	 * @return DateTime|null
	 */
	public function getDate(): ?DateTime
	{
		return $this->date;
	}


	/**
	 * @param null|string $date
	 */
	public function setDate(?string $date): void
	{
		$this->date = $date;
	}

	/**
	 * @return string|null
	 */
	public function getBrowserName(): ?string
	{
		return $this->browserName;
	}


	/**
	 * @param null|string $browserName
	 */
	public function setBrowserName(?string $browserName): void
	{
		$this->browserName = $browserName;
	}


	/**
	 * @return mixed
	 */
	public function getPlatform(): ?string
	{
		return $this->platform;
	}


	/**
	 * @param null|string $platform
	 */
	public function setPlatform(?string $platform): void
	{
		$this->platform = $platform;
	}

	/**
	 * @return string
	 */
	public function getVersion(): ?string
	{
		return $this->version;
	}


	/**
	 * @param null|string $version
	 */
	public function setVersion(?string $version): void
	{
		$this->version = $version;
	}


	/**
	 * @return mixed
	 */
	public function getAolVersion(): ?string
	{
		return $this->aolVersion;
	}


	/**
	 * @param null|string $aolVersion
	 */
	public function setAolVersion(?string $aolVersion): void
	{
		$this->aolVersion = $aolVersion;
	}


	/**
	 * @return bool
	 */
	public function isMobile(): bool
	{
		return $this->isMobile;
	}


	/**
	 * @param bool $isMobile
	 */
	public function setMobile(bool $isMobile): void
	{
		$this->isMobile = $isMobile;
	}


	/**
	 * @return bool
	 */
	public function isTablet(): bool
	{
		return $this->isTablet;
	}


	/**
	 * @param bool $isTablet
	 */
	public function setTablet(bool $isTablet): void
	{
		$this->isTablet = $isTablet;
	}


	/**
	 * @return bool
	 */
	public function isFacebook(): bool
	{
		return $this->isFacebook;
	}

	/**
	 * @param bool $isFacebook
	 */
	public function setFacebook(bool $isFacebook): void
	{
		$this->isFacebook = $isFacebook;
	}


	/**
	 * @return bool
	 */
	public function isChromeFrame(): bool
	{
		return $this->isChromeFrame;
	}


	/**
	 * @param bool $isChromeFrame
	 */
	public function setChromeFrame(bool $isChromeFrame): void
	{
		$this->isChromeFrame = $isChromeFrame;
	}

	/**
	 * @return bool
	 */
	public function isRobot(): bool
	{
		return $this->isRobot;
	}


	/**
	 * @param bool $isRobot
	 */
	public function setRobot(bool $isRobot): void
	{
		$this->isRobot = $isRobot;
	}


	/**
	 * @return string|null
	 */
	public function getUserAgent(): ?string
	{
		return $this->userAgent;
	}


	/**
	 * @param null|string $userAgent
	 */
	public function setUserAgent(?string $userAgent): void
	{
		$this->userAgent = $userAgent;
	}
}