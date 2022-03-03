<?php

namespace Pronto\MobileBundle\Repository\PushNotification;

use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Device;

class SegmentRepository extends EntityRepository
{
    /**
     * @throws Exception
     */
    public function getWithSubscribedStatus(Device $device): array
    {
        $application = $device->getApplication();

        $query = 'SELECT 
			segments.id, 
			segments.name, 
			IF((SELECT COUNT(device_segments.device_id) FROM device_segments WHERE device_segments.segment_id = segments.id AND device_segments.device_id = ?) > 0, true, false) AS subscribed 
		  FROM push_notification_segments AS segments
		  WHERE segments.application_id = ?';

        $entityManager = $this->getEntityManager();
        $statement = $entityManager->getConnection()->prepare($query);
        $result = $statement->executeQuery([$device->getId(), $application->getId()]);

        return $result->fetchAllAssociative();
    }
}
