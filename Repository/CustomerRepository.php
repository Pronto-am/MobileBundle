<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class CustomerRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Customer::class;
    }

    /**
     * @return PaginationResponse
     */
    public function paginate(): PaginationResponse
    {
        $query = $this->createQueryBuilder('entity');

        if($this->filters->isSearching()) {
            $query = $query->andWhere('entity.companyName LIKE :search')->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

    /**
     * @return mixed
     */
    public function list()
    {
        $query = $this->createQueryBuilder('entity');
        return $this->listQuery($query);
    }
}
