<?php

namespace Pronto\MobileBundle\Entity\PushNotification;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Recipient
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="push_notification_segments")
 */
class Segment implements ApiEntityInterface
{
	use ApiEntityTrait;

	// Custom entity error messages
	public const INVALID_SEGMENT_PARAMETER = [422, 22, 'Segments has to be a list with the id and whether the device is subscribed or not'];

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $application;

	/**
	 * @ORM\Column(type="json_array")
	 * @Assert\NotBlank()
	 */
	private $name;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Device\DeviceSegment", mappedBy="segment")
	 */
	private $deviceSegments;

	/**
	 * @return int|null
	 */
	public function getId(): ?int
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
	 * @return array
	 */
	public function getName(): array
	{
		return $this->name;
	}

	/**
	 * @param array $name
	 */
	public function setName(array $name): void
	{
		$this->name = $name;
	}

	/**
	 * @return array
	 */
	public function getDeviceSegments(): array
	{
		return $this->deviceSegments;
	}
}
