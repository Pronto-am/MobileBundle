<?php

namespace Pronto\MobileBundle\Repository\Collection\Relationship;

use Doctrine\DBAL\DBALException;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Collection;

class MapperRepository extends EntityRepository
{
    /**
     * @throws Exception
     */
    public function getAllRelatedEntryIds(string $entryId, Collection $relatedCollection): array
    {
        $query = 'SELECT entry_right_id FROM collection_relationship_mappers WHERE entry_left_id = ? AND related_collection_id = ?';

        $entityManager = $this->getEntityManager();
        $statement = $entityManager->getConnection()->prepare($query);
        $result = $statement->executeQuery([$entryId, $relatedCollection->getId()]);

        // Map the ID's to a single array
        $results = array_map(function ($value) {
            return $value['entry_right_id'];
        }, $result->fetchAllAssociative());

        return array_values($results);
    }
}
