<?php

namespace Pronto\MobileBundle\Entity\PushNotification;

use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


/**
 * Class Recipient
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\PushNotification\RecipientRepository")
 * @ORM\Table(name="push_notification_recipients")
 */
class Recipient implements ApiEntityInterface
{
	use ApiEntityTrait;


	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\PushNotification", inversedBy="pushNotificationRecipients")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $pushNotification;


	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Device", inversedBy="pushNotificationRecipients")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $device;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $sent = true;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 */
	private $description;


	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 */
	private $opened;


	public function __construct(PushNotification $pushNotification, Device $device)
	{
		$this->pushNotification = $pushNotification;
		$this->device = $device;
	}


	/**
	 * @return mixed
	 */
	public function getPushNotification()
	{
		return $this->pushNotification;
	}


	/**
	 * @param mixed $pushNotification
	 */
	public function setPushNotification($pushNotification): void
	{
		$this->pushNotification = $pushNotification;
	}


	/**
	 * @return mixed
	 */
	public function getDevice()
	{
		return $this->device;
	}


	/**
	 * @return mixed
	 */
	public function getSent()
	{
		return $this->sent;
	}


	/**
	 * @param mixed $sent
	 */
	public function setSent($sent): void
	{
		$this->sent = $sent;
	}


	/**
	 * @return mixed
	 */
	public function getDescription()
	{
		return $this->description;
	}


	/**
	 * @param mixed $description
	 */
	public function setDescription($description): void
	{
		$this->description = $description;
	}


	/**
	 * @return mixed
	 */
	public function getOpened()
	{
		return $this->opened;
	}


	/**
	 * @param mixed $opened
	 */
	public function setOpened($opened): void
	{
		$this->opened = $opened;
	}
}