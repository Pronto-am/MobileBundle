<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Collection;

class CollectionRepository extends EntityRepository
{
    public function findByApplication(Application $application, string $id): ?Collection
    {
        return $this->createQueryBuilder('collection')
            ->leftJoin('collection.applicationVersion', 'applicationVersion')
            ->leftJoin('applicationVersion.application', 'application')
            ->andWhere('collection.id = :id')
            ->andWhere('application = :application')
            ->setParameters([
                'id'          => $id,
                'application' => $application,
            ])
            ->getQuery()
            ->getOneOrNullResult();
    }
}
