<?php

namespace Pronto\MobileBundle\Repository\Collection;

use Doctrine\ORM\EntityRepository;

class EntryRepository extends EntityRepository
{
	/**
	 * Get the entries by ID and index them by ID
	 *
	 * @param array $ids
	 * @return mixed
	 */
    public function getWhereIdIn(array $ids) {
    	return $this->createQueryBuilder('entry', 'entry.id')
			->select('entry.id, entry.active, entry.data, entry.createdAt AS created_at, entry.updatedAt AS updated_at, IDENTITY(entry.createdBy) AS created_by_id, IDENTITY(entry.updatedBy) AS updated_by_id')
			->where('entry.id IN (:ids)')
			->setParameter('ids', $ids)
			->getQuery()
			->getArrayResult();
    }
}