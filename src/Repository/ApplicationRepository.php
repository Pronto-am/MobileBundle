<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\DBAL\DBALException;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\ORMException;
use Pronto\MobileBundle\Entity\Application;

class ApplicationRepository extends EntityRepository
{
    /**
     * @throws Exception
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

        $result = $statement->executeQuery();
        return $result->fetchAllAssociative();
    }

    /**
     * @throws ORMException
     * @throws Exception
     */
    public function findByOAuthCredentials(string $randomId, string $secret): ?Application
    {
        $connection = $this->getEntityManager()->getConnection();
        $query = 'SELECT * FROM applications WHERE random_id = :randomId AND secret = :secret';
        $statement = $connection->prepare($query);
        $statement->bindValue('randomId', $randomId);
        $statement->bindValue('secret', $secret);
        $result = $statement->executeQuery();

        $data = $result->fetchAllAssociative();

        if (isset($data[0])) {
            return $this->getEntityManager()->getReference(Application::class, $data[0]['id']);
        }

        return null;
    }
}
