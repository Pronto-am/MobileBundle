<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Application;

class TranslationKeyRepository extends EntityRepository
{
    /**
     * @param Application $application
     * @param string $identifier
     * @param int|null $id
     * @return bool
     */
    public function isUnique(Application $application, string $identifier, int $id = null): bool
    {
        $parameters = [
            'application' => $application,
            'identifier'  => $identifier,
        ];

        $query = $this->createQueryBuilder('key')
            ->where('key.application = :application')
            ->andWhere('key.identifier = :identifier');

        if ($id !== null) {
            $query = $query->andWhere('key.id != :id');
            $parameters['id'] = $id;
        }

        $results = $query->getQuery()->execute($parameters);

        return count($results) === 0;
    }
}