<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use PascalDeVink\ShortUuid\ShortUuid;
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
	 * @return mixed
	 */
	public function getId()
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
	 * @param mixed $application
	 */
	public function setApplication($application): void
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
	public function setSentBy($sentBy): void
	{
		$this->sentBy = $sentBy;
	}


	/**
	 * @return mixed
	 */
	public function getSegment()
	{
		return $this->segment;
	}


	/**
	 * @param mixed $segment
	 */
	public function setSegment($segment): void
	{
		$this->segment = $segment;
	}


	/**
	 * @return mixed
	 */
	public function getTitle()
	{
		return $this->title;
	}


	/**
	 * @param mixed $title
	 */
	public function setTitle($title): void
	{
		$this->title = $title;
	}


	/**
	 * @return mixed
	 */
	public function getContent()
	{
		return $this->content;
	}


	/**
	 * @param mixed $content
	 */
	public function setContent($content): void
	{
		$this->content = $content;
	}


	/**
	 * @return mixed
	 */
	public function getClickAction()
	{
		return $this->clickAction;
	}


	/**
	 * @param mixed $clickAction
	 */
	public function setClickAction($clickAction): void
	{
		$this->clickAction = $clickAction;
	}


	/**
	 * @return mixed
	 */
	public function getClickActionUrl()
	{
		return $this->clickActionUrl;
	}


	/**
	 * @param mixed $clickActionUrl
	 */
	public function setClickActionUrl($clickActionUrl): void
	{
		$this->clickActionUrl = $clickActionUrl;
	}


	/**
	 * @return mixed
	 */
	public function getClickActionHtml()
	{
		return $this->clickActionHtml;
	}


	/**
	 * @param mixed $clickActionHtml
	 */
	public function setClickActionHtml($clickActionHtml): void
	{
		$this->clickActionHtml = $clickActionHtml;
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
	public function getScheduledSending()
	{
		return $this->scheduledSending;
	}


	/**
	 * @param mixed $scheduledSending
	 */
	public function setScheduledSending($scheduledSending): void
	{
		$this->scheduledSending = $scheduledSending;
	}


	/**
	 * @return mixed
	 */
	public function getTest()
	{
		return $this->test;
	}


	/**
	 * @param mixed $test
	 */
	public function setTest($test): void
	{
		$this->test = $test;
	}


	/**
	 * @return mixed
	 */
	public function getTestDevices()
	{
		return $this->testDevices;
	}


	/**
	 * @param mixed $testDevices
	 */
	public function setTestDevices($testDevices): void
	{
		$this->testDevices = $testDevices;
	}


	/**
	 * @return mixed
	 */
	public function getBeingProcessed()
	{
		return $this->beingProcessed;
	}


	/**
	 * @param mixed $beingProcessed
	 */
	public function setBeingProcessed($beingProcessed): void
	{
		$this->beingProcessed = $beingProcessed;
	}


	/**
	 * @return mixed
	 */
	public function getPushNotificationRecipients()
	{
		return $this->pushNotificationRecipients;
	}
}