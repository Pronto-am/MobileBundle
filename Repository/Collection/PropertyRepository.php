<?php

namespace Pronto\MobileBundle\Repository\Collection;

use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Exception\MethodNotImplementedException;
use Pronto\MobileBundle\Repository\PaginateableRepository;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class PropertyRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Collection\Property::class;
    }

    /**
     * Get all properties of a collection
     *
     * @param Collection $collection
     * @param bool $translatable
     * @return mixed
     */
    public function findAllByCollection(Collection $collection, bool $translatable = false) {
        return $this->createQueryBuilder('property')
            ->where('property.collection = :collection')
            ->setParameter('collection', $collection)
			->andWhere('property.translatable = :translatable')
			->setParameter('translatable', $translatable)
            ->orderBy('property.ordering')
            ->getQuery()
            ->execute();
    }

    /**
     * @inheritDoc
     * @throws MethodNotImplementedException
     */
    public function paginate(): PaginationResponse
    {
        throw new MethodNotImplementedException();
    }

    /**
     * @inheritDoc
     */
    public function list()
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.collection = :collection')
            ->setParameter('collection', $this->filters->get('collection_id'));

        return $this->listQuery($query);
    }
}
