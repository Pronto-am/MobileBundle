<?php

namespace Pronto\MobileBundle\Repository\Collection;

use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Repository\EntityRepository;

class PropertyRepository extends EntityRepository
{
    public function findAllByCollection(Collection $collection, bool $translatable = false)
    {
        return $this->createQueryBuilder('property')
            ->where('property.collection = :collection')
            ->setParameter('collection', $collection)
            ->andWhere('property.translatable = :translatable')
            ->setParameter('translatable', $translatable)
            ->orderBy('property.ordering')
            ->getQuery()
            ->execute();
    }
}
