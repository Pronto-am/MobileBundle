<?php

namespace Pronto\MobileBundle\Repository\Collection\Property;

use Doctrine\ORM\EntityRepository;

class TypeRepository extends EntityRepository
{
	/**
	 * @return mixed
	 */
    public function findAllOrdered() {
        return $this->createQueryBuilder('type')
			->orderBy('type.ordering', 'ASC')
            ->getQuery()
            ->execute();
    }
}