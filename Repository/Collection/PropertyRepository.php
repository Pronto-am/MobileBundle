<?php

namespace Pronto\MobileBundle\Repository\Collection;

use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Collection;

class PropertyRepository extends EntityRepository
{
	/**
	 * Get all properties of a collection
	 *
	 * @param Collection $collection
	 * @param bool $translatable
	 * @return mixed
	 */
    public function findAllByCollection(Collection $collection, $translatable = false) {
        return $this->createQueryBuilder('property')
			->leftJoin('property.type', 'type')
            ->where('property.collection = :collection')
            ->setParameter('collection', $collection)
			->andWhere('type.translatable = :translatable')
			->setParameter('translatable', $translatable)
            ->getQuery()
            ->execute();
    }
}