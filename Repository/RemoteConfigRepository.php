<?php

namespace Pronto\MobileBundle\Repository;

use DateTime;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class RemoteConfigRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return RemoteConfig::class;
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
            $query = $query->andWhere('entity.name LIKE :search OR entity.identifier LIKE :search OR entity.value LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

    /**
     * @param Application $application
     * @param string $identifier
     * @param int|null $excludeId
     * @return bool
     */
    public function isUnique(Application $application, string $identifier, int $excludeId = null): bool
    {
        $parameters = [
            'application' => $application,
            'identifier'  => $identifier,
        ];

        $query = $this->createQueryBuilder('config')
            ->where('config.application = :application')
            ->andWhere('config.identifier = :identifier');

        if ($excludeId !== null) {
            $query = $query->andWhere('config.id != :id');
            $parameters['id'] = $excludeId;
        }

        $results = $query->getQuery()->execute($parameters);

        return count($results) === 0;
    }

    /**
     * @param Application $application
     * @param string|null $platform
     * @param DateTime|null $afterDate
     * @return mixed
     */
    public function byPlatform(Application $application, string $platform = null, DateTime $afterDate = null)
    {
        $query = $this->createQueryBuilder('config')->where('config.application = :application');
        $parameters = ['application' => $application];

        if($platform !== null) {
            $query = $query->andWhere(sprintf('config.%s = true', $platform));
        }

        if($afterDate !== null) {
            $query = $query->andWhere('(config.releaseDate <= :releaseDate OR config.releaseDate IS NULL)')->orWhere();
            $parameters['releaseDate'] = $afterDate;
        }

        return $query->orderBy('config.identifier')->getQuery()->execute($parameters);
    }
}
