<?php

namespace Pronto\MobileBundle\Repository\PushNotification;

use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\Repository\EntityRepository;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Repository\PaginateableRepository;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class SegmentRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Segment::class;
    }

    /**
     * @return PaginationResponse
     */
    public function paginate(): PaginationResponse
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.application = :application')
            ->setParameter('application', $this->prontoMobile->getApplication());

        if($this->filters->isSearching()) {
            $query = $query->andWhere('entity.name LIKE :search LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

	/**
	 * Get the number of successfully delivered notifications
	 *
	 * @param Device $device
	 * @return array
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getWithSubscribedStatus(Device $device): array
	{
		/** @var Application $application */
		$application = $device->getApplication();

		$query = 'SELECT 
			segments.id, 
			segments.name, 
			IF((SELECT COUNT(device_segments.device_id) FROM device_segments WHERE device_segments.segment_id = segments.id AND device_segments.device_id = ?) > 0, true, false) AS subscribed 
		  FROM push_notification_segments AS segments
		  WHERE segments.application_id = ?';

		$statement = $this->entityManager->getConnection()->prepare($query);
		$statement->execute([$device->getId(), $application->getId()]);

		return $statement->fetchAll();
	}
}
