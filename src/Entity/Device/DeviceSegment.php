<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Device;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Segment;

/**
 * Class DeviceSegment
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'device_segments')]
#[ORM\Entity(repositoryClass: 'Pronto\MobileBundle\Repository\Device\SegmentRepository')]
class DeviceSegment
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\PushNotification\Segment', inversedBy: 'deviceSegments')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $segment;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Device', inversedBy: 'deviceSegments')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $device;

    public function __construct(Segment $segment, Device $device)
    {
        $this->segment = $segment;
        $this->device = $device;
    }

    /**
     * @return Segment
     */
    public function getSegment(): Segment
    {
        return $this->segment;
    }

    /**
     * @return Device
     */
    public function getDevice(): Device
    {
        return $this->device;
    }
}
