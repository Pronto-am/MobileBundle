<?php

namespace Pronto\MobileBundle\Repository;

use DateTime;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Application;

class PushNotificationRepository extends EntityRepository
{
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
     * @throws Exception
     */
    public function findForDevice(string $id, Application $application)
    {
        // Select the notification id's from the recipients table
        $entityManager = $this->getEntityManager();
        $statement = $entityManager->getConnection()->prepare("SELECT DISTINCT(push_notification_id) as id FROM push_notification_recipients WHERE device_id = ?");
        $result = $statement->executeQuery([$id]);

        $ids = array_column($result->fetchAllAssociative(), 'id');

        return $this->createQueryBuilder('notifications')
            ->where('notifications.id IN (:ids)')
            ->andWhere('notifications.application = :application')
            ->andWhere('notifications.sent IS NOT NULL')
            ->setParameter('ids', $ids)
            ->setParameter('application', $application)
            ->orderBy('notifications.sent', 'desc')
            ->getQuery()
            ->execute();
    }

    /**
     * @throws Exception
     */
    public function getRecipientCount(Application $application, int $segment, bool $test = false, array $testDevices = []): array
    {
        $query = 'SELECT COUNT(DISTINCT(devices.id)) AS recipients FROM devices LEFT JOIN device_segments AS segments ON segments.device_id = devices.id';

        $query .= ' WHERE application_id = ' . (int) $application->getId() . ' AND devices.token_state = 1 AND devices.push_notifications = 1';

        if ($segment > 0) {
            $query .= ' AND segments.segment_id = ' . $segment;
        }

        // If it's a test broadcast, filter test by users
        if ($test && is_array($testDevices) && !empty($testDevices)) {
            $query .= ' AND devices.id IN (\'' . implode('\', \'', $testDevices) . '\')';
        }

        // Execute the query
        $entityManager = $this->getEntityManager();
        $statement = $entityManager->getConnection()->prepare($query);

        $result = $statement->executeQuery();

        return $result->fetchFirstColumn();
    }
}
