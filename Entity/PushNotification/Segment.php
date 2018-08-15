<?php

namespace Pronto\MobileBundle\Entity\PushNotification;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


/**
 * Class Recipient
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\PushNotification\SegmentRepository")
 * @ORM\Table(name="push_notification_segments")
 */
class Segment implements ApiEntityInterface
{
	use ApiEntityTrait;


	// Custom entity error messages
	public const INVALID_SEGMENT_PARAMETER = 'Segments has to be a list with the id and whether the device is subscribed or not';


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
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
	}


	/**
	 * @return mixed
	 */
	public function getApplication()
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
	public function getDeviceSegments()
	{
		return $this->deviceSegments;
	}
}