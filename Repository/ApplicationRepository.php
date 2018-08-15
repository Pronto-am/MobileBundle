<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\EntityRepository;

class ApplicationRepository extends EntityRepository
{
	/**
	 * Get the applications for which there are firebase tokens
	 *
	 * @return array
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getWithMissingFirebaseTokens(): array
	{
		$select = [];
		$select[] = 'applications.id';
		$select[] = 'applications.ios_bundle_identifier';
		$select[] = '(SELECT COUNT(id) FROM devices where firebase_token IS NULL and application_id = applications.id) AS tokens';

		// Get applications and count of missing firebase tokens
		$query = 'SELECT ' . implode(', ', $select) . ' FROM applications LEFT JOIN devices ON devices.application_id = applications.id GROUP BY applications.id HAVING tokens > 0';

		// Execute the query
		$entityManager = $this->getEntityManager();
		$statement = $entityManager->getConnection()->prepare($query);

		$statement->execute();

		return $statement->fetchAll();
	}
}