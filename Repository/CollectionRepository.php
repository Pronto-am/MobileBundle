<?php

namespace Pronto\MobileBundle\Repository;

use DateTime;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class CollectionRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Collection::class;
    }

    /**
     * @return PaginationResponse
     */
    public function paginate(): PaginationResponse
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.applicationVersion = :applicationVersion')
            ->setParameter('applicationVersion', $this->prontoMobile->getApplicationVersion());

        if($this->filters->isSearching()) {
            $query = $query->andWhere('entity.name LIKE :search OR entity.identifier LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }
}
