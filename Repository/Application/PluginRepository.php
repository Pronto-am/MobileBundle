<?php

namespace Pronto\MobileBundle\Repository\Application;

use Pronto\MobileBundle\Entity\Application;
use Doctrine\ORM\EntityRepository;

class PluginRepository extends EntityRepository
{
	/**
	 * Find the applications plugins by application
	 *
	 * @param Application $application
	 * @return mixed
	 */
    public function findAllByApplication(Application $application) {
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
	 * @param $identifier
	 * @return mixed
	 * @throws \Doctrine\ORM\NoResultException
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
    public function findOneByApplicationAndIdentifier($application, $identifier) {
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