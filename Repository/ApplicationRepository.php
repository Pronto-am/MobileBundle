<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class ApplicationRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Application::class;
    }

    /**
     * @return PaginationResponse
     */
    public function paginate(): PaginationResponse
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.customer = :customer')
            ->setParameter('customer', $this->prontoMobile->getCustomer());

        if($this->filters->isSearching()) {
            $query = $query->andWhere('entity.name LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

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
        $statement = $this->entityManager->getConnection()->prepare($query);

        $statement->execute();

        return $statement->fetchAll();
    }

    /**
     * @param string $randomId
     * @param string $secret
     * @return Application|null
     * @throws \Doctrine\DBAL\DBALException
     * @throws \Doctrine\ORM\ORMException
     */
    public function findByOAuthCredentials(string $randomId, string $secret): ?Application
    {
        $connection = $this->entityManager->getConnection();
        $query = 'SELECT * FROM applications WHERE random_id = :randomId AND secret = :secret';
        $statement = $connection->prepare($query);
        $statement->bindValue('randomId', $randomId);
        $statement->bindValue('secret', $secret);
        $statement->execute();

        $data = $statement->fetchAll();

        if(isset($data[0])) {
            return $this->entityManager->getReference(Application::class, $data[0]['id']);
        }

        return null;
    }
}
