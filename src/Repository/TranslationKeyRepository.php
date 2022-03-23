<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Pronto\MobileBundle\Entity\Application;

class TranslationKeyRepository extends EntityRepository
{
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

    public function getList(Application $application, string $search = null, string $order = null, int $page = 1): array
    {
        $query = $this->createQueryBuilder('translationKey')
            ->andWhere('translationKey.application = :application')
            ->setParameter('application', $application);

        if ($search !== null) {
            $query = $query->andWhere('translationKey.identifier LIKE :identifier')
                ->setParameter('identifier', '%' . $search . '%');
        }

        if ($order !== null) {
            [$field, $direction] = explode('.', $order);
            $query = $query->orderBy('translationKey.' . $field, $direction);
        } else {
            $query = $query->orderBy('translationKey.identifier', 'asc');
        }

        return $query->setMaxResults(100)->setFirstResult(($page - 1) * 100)->getQuery()->execute();
    }

    /**
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function getCount(Application $application, string $search = null): int
    {
        $query = $this->createQueryBuilder('translationKey')
            ->select('count(translationKey.id)')
            ->andWhere('translationKey.application = :application')
            ->setParameter('application', $application);

        if ($search !== null) {
            $query = $query->andWhere('translationKey.identifier LIKE :identifier')
                ->setParameter('identifier', '%' . $search . '%');
        }

        return $query->getQuery()->getSingleScalarResult();
    }
}
