<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Application;
use DateTime;
use Doctrine\ORM\EntityRepository;

class PushNotificationRepository extends EntityRepository
{
	/**
	 * Get the scheduled push notifications by date
	 *
	 * @param DateTime $dateTime
	 * @return mixed
	 */
	public function retrieveScheduledTasksByDate(DateTime $dateTime)
	{
		return $this->createQueryBuilder('notifications')
			->andWhere('notifications.scheduledSending IS NOT NULL')
			->andWhere('notifications.scheduledSending < :date')
			->setParameter('date', $dateTime)
			->andWhere('notifications.beingProcessed = 0')
			->getQuery()
			->execute();
	}


	/**
	 * Set notifications as being processed by an array of id's
	 *
	 * @param array $ids
	 * @return mixed
	 */
	public function setBeingProcessedByIds(array $ids)
	{
		return $this->createQueryBuilder('notifications')->update()
			->set('notifications.beingProcessed', 1)
			->where('notifications.id IN (:ids)')
			->setParameter('ids', $ids)
			->getQuery()
			->execute();
	}


	/**
	 * Get the recipient count by where clauses
	 *
	 * @param Application $application
	 * @param int $segment
	 * @param bool $test
	 * @param array $testDevices
	 * @return bool|string
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getRecipientCount(Application $application, int $segment, bool $test = false, array $testDevices = [])
	{
		$query = 'SELECT COUNT(DISTINCT(devices.id)) AS recipients FROM devices LEFT JOIN device_segments AS segments ON segments.device_id = devices.id';

		$query .= ' WHERE application_id = ' . (int)$application->getId() . ' AND devices.token_state = 1 AND devices.push_notifications = 1';

		if ($segment > 0) {
			$query .= ' AND segments.segment_id = ' . $segment;
		}

		// If it's a test broadcast, filter test by users
		if ($test && !empty($testDevices)) {
			$query .= ' AND devices.id IN (\'' . implode('\', \'', $testDevices) . '\')';
		}

		// Execute the query
		$entityManager = $this->getEntityManager();
		$statement = $entityManager->getConnection()->prepare($query);

		$statement->execute();

		return $statement->fetchColumn();
	}
}