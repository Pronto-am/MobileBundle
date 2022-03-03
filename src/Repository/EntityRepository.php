<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\EntityRepository as BaseEntityRepository;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;

class EntityRepository extends BaseEntityRepository
{
    /**
     * @throws EntityNotFoundException
     */
    public function findOrFail($id, $lockMode = null, $lockVersion = null): object
    {
        $entity = $this->find($id, $lockMode, $lockVersion);

        if ($entity === null) {
            throw new EntityNotFoundException();
        }

        return $entity;
    }

    /**
     * @throws EntityNotFoundException
     */
    public function findOneByOrFail(array $criteria, array $orderBy = null)
    {
        $entity = $this->findOneBy($criteria, $orderBy);

        if ($entity === null) {
            throw new EntityNotFoundException();
        }

        return $entity;
    }
}
