<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use PascalDeVink\ShortUuid\ShortUuid;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Ramsey\Uuid\Uuid;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


/**
 * Class Sender
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\PushNotificationRepository")
 * @ORM\Table(name="push_notifications")
 * @ORM\HasLifecycleCallbacks
 */
class PushNotification implements ApiEntityInterface
{
	use ApiEntityTrait;


	public const TYPE_NO_ACTION = 0;
	public const TYPE_URL_ACTION = 1;
	public const TYPE_HTML_ACTION = 2;

	public const TYPE_SCHEDULE = 3;


	/**
	 * @ORM\Id
	 * @ORM\Column(type="string")
	 */
	private $id;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $application;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\User", inversedBy="pushNotifications")
	 * @ORM\JoinColumn(onDelete="SET NULL", nullable=true)
	 */
	private $sentBy;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\PushNotification\Segment")
	 * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
	 */
	private $segment;


	/**
	 * @ORM\Column(type="json_array")
	 */
	private $title;


	/**
	 * @ORM\Column(type="json_array", nullable=true)
	 */
	private $content;


	/**
	 * @ORM\Column(type="integer", nullable=false)
	 */
	private $clickAction;


	/**
	 * @ORM\Column(type="json_array", nullable=true)
	 */
	private $clickActionUrl;


	/**
	 * @ORM\Column(type="json_array", nullable=true)
	 */
	private $clickActionHtml;


	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 */
	private $sent;


	/**
	 * @ORM\Column(type="datetime", nullable=true)
	 */
	private $scheduledSending;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $test = false;


	/**
	 * @ORM\Column(type="json_array")
	 */
	private $testDevices;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $beingProcessed = false;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\PushNotification\Recipient", mappedBy="pushNotification")
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
	 * @return string
	 */
	public function getId(): string
	{
		return $this->id;
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
	 * @return User|null
	 */
	public function getSentBy(): ?User
	{
		return $this->sentBy;
	}


	/**
	 * @param User $sentBy
	 */
	public function setSentBy(User $sentBy): void
	{
		$this->sentBy = $sentBy;
	}


	/**
	 * @return Segment|null
	 */
	public function getSegment(): ?Segment
	{
		return $this->segment;
	}


	/**
	 * @param Segment $segment
	 */
	public function setSegment(Segment $segment): void
	{
		$this->segment = $segment;
	}


	/**
	 * @return array
	 */
	public function getTitle(): array
	{
		return $this->title;
	}


	/**
	 * @param array $title
	 */
	public function setTitle(array $title): void
	{
		$this->title = $title;
	}


	/**
	 * @return array|null
	 */
	public function getContent(): ?array
	{
		return $this->content;
	}


	/**
	 * @param array $content
	 */
	public function setContent(array $content): void
	{
		$this->content = $content;
	}


	/**
	 * @return int
	 */
	public function getClickAction(): int
	{
		return $this->clickAction;
	}


	/**
	 * @param int $clickAction
	 */
	public function setClickAction(int $clickAction): void
	{
		$this->clickAction = $clickAction;
	}


	/**
	 * @return array|null
	 */
	public function getClickActionUrl(): ?array
	{
		return $this->clickActionUrl;
	}


	/**
	 * @param array $clickActionUrl
	 */
	public function setClickActionUrl(array $clickActionUrl): void
	{
		$this->clickActionUrl = $clickActionUrl;
	}


	/**
	 * @return array|null
	 */
	public function getClickActionHtml(): ?array
	{
		return $this->clickActionHtml;
	}


	/**
	 * @param array $clickActionHtml
	 */
	public function setClickActionHtml(array $clickActionHtml): void
	{
		$this->clickActionHtml = $clickActionHtml;
	}


	/**
	 * @return DateTime|null
	 */
	public function getSent(): ?DateTime
	{
		return $this->sent;
	}


	/**
	 * @param DateTime $sent
	 */
	public function setSent(DateTime $sent): void
	{
		$this->sent = $sent;
	}


	/**
	 * @return DateTime|null
	 */
	public function getScheduledSending(): ?DateTime
	{
		return $this->scheduledSending;
	}


	/**
	 * @param DateTime|null $scheduledSending
	 */
	public function setScheduledSending($scheduledSending): void
	{
		$this->scheduledSending = $scheduledSending;
	}


	/**
	 * @return bool
	 */
	public function getTest(): bool
	{
		return $this->test;
	}


	/**
	 * @param bool $test
	 */
	public function setTest(bool $test): void
	{
		$this->test = $test;
	}


	/**
	 * @return array
	 */
	public function getTestDevices(): array
	{
		return $this->testDevices;
	}


	/**
	 * @param array $testDevices
	 */
	public function setTestDevices(array $testDevices): void
	{
		$this->testDevices = $testDevices;
	}


	/**
	 * @return bool
	 */
	public function getBeingProcessed(): bool
	{
		return $this->beingProcessed;
	}


	/**
	 * @param bool $beingProcessed
	 */
	public function setBeingProcessed(bool $beingProcessed): void
	{
		$this->beingProcessed = $beingProcessed;
	}


	/**
	 * @return ArrayCollection
	 */
	public function getPushNotificationRecipients(): ArrayCollection
	{
		return $this->pushNotificationRecipients;
	}
}