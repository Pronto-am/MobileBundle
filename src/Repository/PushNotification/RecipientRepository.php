<?php

namespace Pronto\MobileBundle\Repository\PushNotification;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\QueryBuilder;
use Pronto\MobileBundle\Entity\PushNotification;

class RecipientRepository extends EntityRepository
{
    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function getSuccessfulSentCountByNotification(PushNotification $notification)
    {
        return $this->getBasicCountQuery($notification)
            ->andWhere('recipients.sent = 1')
            ->getQuery()
            ->getSingleScalarResult();
    }

    private function getBasicCountQuery(PushNotification $notification): QueryBuilder
    {
        return $this->createQueryBuilder('recipients')
            ->select('count(recipients.pushNotification)')
            ->andWhere('recipients.pushNotification = :notification')
            ->setParameter('notification', $notification);
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function getBounceCountByNotification(PushNotification $notification)
    {
        return $this->getBasicCountQuery($notification)
            ->andWhere('recipients.sent = 0')
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function getOpenedCountByNotification(PushNotification $notification)
    {
        return $this->getBasicCountQuery($notification)
            ->andWhere('recipients.opened IS NOT NULL')
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function getClickedCountByNotification(PushNotification $notification)
    {
        return $this->createQueryBuilder('recipients')
            ->select('COUNT(recipients.opened) AS y, recipients.opened AS x')
            ->andWhere('recipients.pushNotification = :notification')
            ->setParameter('notification', $notification)
            ->andWhere('recipients.opened IS NOT NULL')
            ->groupBy('recipients.opened')
            ->getQuery()
            ->execute();
    }

    public function getSuccessfulSentCountByNotificationGroupByPlatform(PushNotification $notification)
    {
        return $this->createQueryBuilder('recipients')
            ->select('COUNT(recipients.sent) AS count, device.platform')
            ->leftJoin('recipients.device', 'device')
            ->andWhere('recipients.sent = 1')
            ->andWhere('recipients.pushNotification = :notification')
            ->setParameter('notification', $notification)
            ->groupBy('device.platform')
            ->getQuery()
            ->execute();
    }
}
