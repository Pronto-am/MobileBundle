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
	 * @return mixed
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getAllRelatedEntryIds(string $entryId, Collection $relatedCollection)
	{
		$query = 'SELECT entry_right_id FROM collection_relationship_mappers WHERE entry_left_id = ? AND related_collection_id = ?';

		$entityManager = $this->getEntityManager();
		$statement = $entityManager->getConnection()->prepare($query);
		$statement->execute([$entryId, $relatedCollection->getId()]);

		// Map the ID's to a single array
		$results = array_map(function ($value) {
			return $value['entry_right_id'];
		}, $statement->fetchAll());

		return array_values($results);
	}
}