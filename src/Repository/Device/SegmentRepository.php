<?php

namespace Pronto\MobileBundle\Repository\Device;

use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Segment;

class SegmentRepository extends EntityRepository
{
	/**
	 * Find the devices' segments
	 *
	 * @param Device $device
	 * @return mixed
	 */
	public function findSegmentsByDevice(Device $device) {
		return $this->createQueryBuilder('t')
			->select('s.id, s.name')
			->leftJoin('t.segment', 's')
			->andWhere('t.device = :device')
			->setParameter('device', $device)
			->getQuery()
			->execute();
	}


	/**
	 * Get the device count by segment
	 *
	 * @param Segment $segment
	 * @return mixed
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
	public function getDeviceCountBySegment(Segment $segment)
	{
		return $this->createQueryBuilder('segments')
			->select('count(segments.device)')
			->leftJoin('segments.device', 'device')
			->where('segments.segment = :segment')
			->setParameter('segment', $segment)
			->andWhere('device.tokenState = 1')
			->getQuery()->getSingleScalarResult();
	}
}