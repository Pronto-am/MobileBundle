<?php

namespace Pronto\MobileBundle\Repository\Application;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Pronto\MobileBundle\Entity\Application;

class PluginRepository extends EntityRepository
{
    /**
     * Find the applications plugins by application
     *
     * @param Application $application
     * @return mixed
     */
    public function findAllByApplication(Application $application)
    {
        return $this->createQueryBuilder('application_plugin')
            ->andWhere('application_plugin.application = :application')
            ->setParameter('application', $application)
            ->getQuery()
            ->execute();
    }

    /**
     * Get an applications plugin by application and plugin identifier
     *
     * @param Application $application
     * @param string $identifier
     * @return mixed
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function findOneByApplicationAndIdentifier(Application $application, string $identifier)
    {
        return $this->createQueryBuilder('application_plugins')
            ->leftJoin('application_plugins.plugin', 'plugins')
            ->where('plugins.identifier = :identifier')
            ->setParameter('identifier', $identifier)
            ->andWhere('application_plugins.application = :application')
            ->setParameter('application', $application)
            ->getQuery()
            ->getSingleResult();
    }
}
