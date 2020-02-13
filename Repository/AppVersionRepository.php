<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class AppVersionRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return AppVersion::class;
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
            $query = $query->andWhere('entity.version LIKE :search OR entity.platform LIKE :search OR entity.description LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }
}
