<?php

namespace Pronto\MobileBundle\Entity\PushNotification;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * Class Recipient
 * @package Pronto\MobileBundle\Entity
 * @ORM\Entity
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
     * @Groups({"PushNotificationDetailed"})
     */
	private $device;

	/**
	 * @ORM\Column(type="boolean")
     * @Groups({"PushNotificationDetailed"})
	 */
	private $sent = true;

	/**
	 * @ORM\Column(type="string", nullable=true)
     * @Groups({"PushNotificationDetailed"})
     */
	private $description;

	/**
	 * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"PushNotificationDetailed"})
     */
	private $opened;

    /**
     * Recipient constructor.
     * @param PushNotification $pushNotification
     * @param Device $device
     */
	public function __construct(PushNotification $pushNotification, Device $device)
	{
		$this->pushNotification = $pushNotification;
		$this->device = $device;
	}

	/**
	 * @return PushNotification
	 */
	public function getPushNotification(): PushNotification
    {
        return $this->pushNotification;
    }

	/**
	 * @param PushNotification $pushNotification
	 */
	public function setPushNotification(PushNotification $pushNotification): void
	{
		$this->pushNotification = $pushNotification;
	}

	/**
	 * @return Device
	 */
	public function getDevice(): Device
	{
		return $this->device;
	}

	/**
	 * @return bool
	 */
	public function getSent(): bool
	{
		return $this->sent;
	}

	/**
	 * @param bool $sent
	 */
	public function setSent(bool $sent): void
	{
		$this->sent = $sent;
	}

	/**
	 * @return string|null
	 */
	public function getDescription(): ?string
	{
		return $this->description;
	}

	/**
	 * @param null|string $description
	 */
	public function setDescription(?string $description): void
	{
		$this->description = $description;
	}

	/**
	 * @return DateTime|null
	 */
	public function getOpened(): ?DateTime
	{
		return $this->opened;
	}

	/**
	 * @param DateTime|string $opened
	 */
	public function setOpened($opened): void
	{
		$this->opened = $opened;
	}
}
