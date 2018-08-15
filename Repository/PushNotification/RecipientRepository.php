<?php

namespace Pronto\MobileBundle\Repository\PushNotification;

use Doctrine\ORM\QueryBuilder;
use Pronto\MobileBundle\Entity\PushNotification;
use Doctrine\ORM\EntityRepository;

class RecipientRepository extends EntityRepository
{
	/**
	 * Get the reusable basic query builder
	 *
	 * @param PushNotification $notification
	 * @return QueryBuilder
	 */
	private function getBasicCountQuery(PushNotification $notification): QueryBuilder
	{
		return $this->createQueryBuilder('recipients')
			->select('count(recipients.pushNotification)')
			->andWhere('recipients.pushNotification = :notification')
			->setParameter('notification', $notification);
	}


	/**
	 * Get the number of successfully delivered notifications
	 *
	 * @param PushNotification $notification
	 * @return mixed
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
	public function getSuccessfulSentCountByNotification(PushNotification $notification) {
		return $this->getBasicCountQuery($notification)
			->andWhere('recipients.sent = 1')
			->getQuery()
			->getSingleScalarResult();
	}


	/**
	 * Get the number of bounced notifications
	 *
	 * @param PushNotification $notification
	 * @return mixed
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
	public function getBounceCountByNotification(PushNotification $notification) {
		return $this->getBasicCountQuery($notification)
			->andWhere('recipients.sent = 0')
			->getQuery()
			->getSingleScalarResult();
	}


	/**
	 * Get the number of bounced notifications
	 *
	 * @param PushNotification $notification
	 * @return mixed
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
	public function getOpenedCountByNotification(PushNotification $notification) {
		return $this->getBasicCountQuery($notification)
			->andWhere('recipients.opened IS NOT NULL')
			->getQuery()
			->getSingleScalarResult();
	}


	/**
	 * Get the clicked statistics, grouped by date
	 *
	 * @param PushNotification $notification
	 * @return mixed
	 */
	public function getClickedCountByNotification(PushNotification $notification) {
		return $this->createQueryBuilder('recipients')
			->select('COUNT(recipients.opened) AS y, recipients.opened AS x')
			->andWhere('recipients.pushNotification = :notification')
			->setParameter('notification', $notification)
			->andWhere('recipients.opened IS NOT NULL')
			->groupBy('recipients.opened')
			->getQuery()
			->execute();
	}


	/**
	 * Get the number of successfully delivered notifications
	 *
	 * @param PushNotification $notification
	 * @return mixed
	 */
	public function getSuccessfulSentCountByNotificationGroupByPlatform(PushNotification $notification) {
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