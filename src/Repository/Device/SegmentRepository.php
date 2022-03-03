<?php

namespace Pronto\MobileBundle\Repository\Device;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Segment;

class SegmentRepository extends EntityRepository
{
    public function findSegmentsByDevice(Device $device)
    {
        return $this->createQueryBuilder('t')
            ->select('s.id, s.name')
            ->leftJoin('t.segment', 's')
            ->andWhere('t.device = :device')
            ->setParameter('device', $device)
            ->getQuery()
            ->execute();
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
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
