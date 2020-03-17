<?php

namespace Pronto\MobileBundle\Repository\Collection\Relationship;

use Doctrine\ORM\EntityRepository;
use Pronto\MobileBundle\Entity\Collection;

class MapperRepository extends EntityRepository
{
    /**
     * Get the id's of entries that are related to a single entry
     *
     * @param string $entryId
     * @param Collection $relatedCollection
     * @param bool $leftToRight
     * @return mixed
     * @throws \Doctrine\DBAL\DBALException
     */
    public function getAllRelatedEntryIds(string $entryId, Collection $relatedCollection, bool $leftToRight = true)
    {
        $query = sprintf('SELECT entry_left_id, entry_right_id FROM collection_relationship_mappers WHERE %s = ? AND related_collection_id = ?', $leftToRight ? 'entry_left_id' : 'entry_right_id');

        dump($query);
        dump([$entryId, $relatedCollection->getId()]);
        $entityManager = $this->getEntityManager();
        $statement = $entityManager->getConnection()->prepare($query);
        $statement->execute([$entryId, $relatedCollection->getId()]);

        // Map the ID's to a single array
        $results = array_map(function ($value) use ($leftToRight) {
            return $value[$leftToRight ? 'entry_right_id' : 'entry_left_id'];
        }, $statement->fetchAll());

        return array_values($results);
    }
}
