<?php

namespace Pronto\MobileBundle\Entity\Device;

use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Doctrine\ORM\Mapping as ORM;


/**
 * Class DeviceSegment
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Device\SegmentRepository")
 * @ORM\Table(name="device_segments")
 */
class DeviceSegment
{
	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\PushNotification\Segment", inversedBy="deviceSegments")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $segment;


	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Device")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $device;


	public function __construct(Segment $segment, Device $device)
	{
		$this->segment = $segment;
		$this->device = $device;
	}


	/**
	 * @return mixed
	 */
	public function getSegment()
	{
		return $this->segment;
	}


	/**
	 * @return mixed
	 */
	public function getDevice()
	{
		return $this->device;
	}
}