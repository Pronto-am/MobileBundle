<?php

namespace Pronto\MobileBundle\Entity\User;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
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
     * @ORM\Column(type="string")
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
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }


	/**
	 * @return mixed
	 */
	public function getUser()
	{
		return $this->user;
	}


	/**
	 * @param mixed $user
	 */
	public function setUser($user): void
	{
		$this->user = $user;
	}


	/**
	 * @return mixed
	 */
	public function getDate()
	{
		return $this->date;
	}


	/**
	 * @param mixed $date
	 */
	public function setDate($date): void
	{
		$this->date = $date;
	}

	/**
	 * @return mixed
	 */
	public function getBrowserName()
	{
		return $this->browserName;
	}


	/**
	 * @param mixed $browserName
	 */
	public function setBrowserName($browserName): void
	{
		$this->browserName = $browserName;
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
	public function getVersion()
	{
		return $this->version;
	}


	/**
	 * @param mixed $version
	 */
	public function setVersion($version): void
	{
		$this->version = $version;
	}


	/**
	 * @return mixed
	 */
	public function getAolVersion()
	{
		return $this->aolVersion;
	}


	/**
	 * @param mixed $aolVersion
	 */
	public function setAolVersion($aolVersion): void
	{
		$this->aolVersion = $aolVersion;
	}


	/**
	 * @return mixed
	 */
	public function isMobile()
	{
		return $this->isMobile;
	}


	/**
	 * @param mixed $isMobile
	 */
	public function setMobile($isMobile): void
	{
		$this->isMobile = $isMobile;
	}


	/**
	 * @return mixed
	 */
	public function isTablet()
	{
		return $this->isTablet;
	}


	/**
	 * @param mixed $isTablet
	 */
	public function setTablet($isTablet): void
	{
		$this->isTablet = $isTablet;
	}


	/**
	 * @return mixed
	 */
	public function isFacebook()
	{
		return $this->isFacebook;
	}

	/**
	 * @param mixed $isFacebook
	 */
	public function setFacebook($isFacebook): void
	{
		$this->isFacebook = $isFacebook;
	}


	/**
	 * @return mixed
	 */
	public function isChromeFrame()
	{
		return $this->isChromeFrame;
	}


	/**
	 * @param mixed $isChromeFrame
	 */
	public function setChromeFrame($isChromeFrame): void
	{
		$this->isChromeFrame = $isChromeFrame;
	}

	/**
	 * @return mixed
	 */
	public function isRobot()
	{
		return $this->isRobot;
	}


	/**
	 * @param mixed $isRobot
	 */
	public function setRobot($isRobot): void
	{
		$this->isRobot = $isRobot;
	}


	/**
	 * @return mixed
	 */
	public function getUserAgent()
	{
		return $this->userAgent;
	}


	/**
	 * @param mixed $userAgent
	 */
	public function setUserAgent($userAgent): void
	{
		$this->userAgent = $userAgent;
	}
}