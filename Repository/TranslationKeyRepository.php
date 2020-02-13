<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class TranslationKeyRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return TranslationKey::class;
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
            $query = $query->andWhere('entity.identifier LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

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
