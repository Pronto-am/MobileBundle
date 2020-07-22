<?php

namespace Pronto\MobileBundle\Repository\Collection\Property;

use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Exception\MethodNotImplementedException;
use Pronto\MobileBundle\Repository\PaginateableRepository;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class TypeRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Collection\Property\Type::class;
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
        return $this->listQuery($this->createQueryBuilder('entity'));
    }
}
