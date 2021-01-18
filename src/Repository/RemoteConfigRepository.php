<?php

namespace Pronto\MobileBundle\Repository;

use DateTime;
use Pronto\MobileBundle\Entity\Application;

class RemoteConfigRepository extends EntityRepository
{
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

        if ($platform !== null) {
            $query = $query->andWhere(sprintf('config.%s = true', $platform));
        }

        if ($afterDate !== null) {
            $query = $query->andWhere('(config.releaseDate <= :releaseDate OR config.releaseDate IS NULL)')->orWhere();
            $parameters['releaseDate'] = $afterDate;
        }

        return $query->orderBy('config.identifier')->getQuery()->execute($parameters);
    }
}
