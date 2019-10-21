<?php

namespace Pronto\MobileBundle\Service\Collection;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Repository\Collection\Relationship\MapperRepository;
use Pronto\MobileBundle\Utils\Collect;

class Retriever
{
	/**
     * @var QueryGenerator $queryGenerator
     */
	private $queryGenerator;

	/**
     * @var Collection $collection
     */
	private $collection;

	/**
     * @var MapperRepository $mapperRepository
     */
	private $mapperRepository;

	/**
     * @var EntryParser $entryParser
     */
	private $entryParser;

	/**
     * @var array $cachedEntries
     */
	private $cachedEntries = [];

	/**
     * @var array $mappedRelationships
     */
	private $mappedRelationships = [];

    /**
     * Retriever constructor.
     * @param QueryGenerator $queryGenerator
     * @param EntityManagerInterface $entityManager
     * @param EntryParser $entryParser
     */
	public function __construct(QueryGenerator $queryGenerator, EntityManagerInterface $entityManager, EntryParser $entryParser)
	{
		$this->queryGenerator = $queryGenerator;
		$this->mapperRepository = $entityManager->getRepository(Collection\Relationship\Mapper::class);
		$this->entryParser = $entryParser;
	}

	/**
	 * Set the collection
	 * @param Collection $collection
	 */
	public function setCollection(Collection $collection): void
	{
		$this->collection = $collection;

		$this->queryGenerator->setCollection($collection);
		$this->entryParser->setCollection($collection);
	}

	/**
	 * Get a single entry of the collection
	 *
	 * @param string $id
	 * @return array|null
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getEntry(string $id): ?array
	{
		$result = $this->queryGenerator->getEntry($id);

		if ($result === null) {
			return null;
		}

		// Load the relationships for the entry
		$this->loadRelationships([$result], true);

		$entries = $this->parseEntries([$result], $this->mappedRelationships);

		return $entries[0];
	}

	/**
	 * Get a paginated list of entries
	 *
	 * @return array
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getEntries(): array
	{
		$this->queryGenerator->parseHttpQuery();

		$results = $this->queryGenerator->getEntries();

		$this->loadRelationships($results);

		// Now we can parse the entire object including the relationships
		return $this->parseEntries($results, $this->mappedRelationships);
	}

	/**
	 * Load the relationships of all entries
	 * @param array $results
	 * @param bool $singleResult
	 * @throws \Doctrine\DBAL\DBALException
	 */
	private function loadRelationships(array $results, $singleResult = false): void
	{
		$relationships = $this->collection->getRelationships();

		if (\count($relationships) > 0) {
			// Get the ids of the results
			$entries = array_map(function ($entry) {
				return $entry['id'];
			}, $results);

			$this->mappedRelationships = [];

			/** @var Collection\Relationship $relationship */
			foreach ($relationships as $relationship) {
				// Skip the relationship if it shouldn't be visible in the listview
				if(!$singleResult && !$relationship->includeInJsonListView()) {
					continue;
				}

				$relatedCollection = $relationship->getRelatedCollection();

				// Change the collection for the query generation
				$this->queryGenerator->setCollection($relatedCollection);
				$this->entryParser->setCollection($relatedCollection);

				foreach ($entries as $entryId) {
					$relatedEntries = $this->mapperRepository->getAllRelatedEntryIds($entryId, $relatedCollection);

					// Get the keys from above result that aren't yet locally cached
					$toRetrieve = array_diff($relatedEntries, array_keys($this->cachedEntries));

					// Retrieve the full entries that are missing
					$toCache = $this->queryGenerator->getRelatedEntries($toRetrieve);

					// Parse the related entries so that the ID becomes key
					$parsed = Collect::keyBy($this->parseEntries($toCache), 'id');

					// Add the retrieved entries to the local cache
					$this->cachedEntries = array_merge($this->cachedEntries, $parsed);

					// Add the Entry objects to the relationship array
					$this->mappedRelationships[$entryId][$relationship->getIdentifier()] = array_filter($this->cachedEntries, function ($entry) use ($relatedEntries) {
						return \in_array($entry['id'], $relatedEntries, true);
					});
				}
			}
		}

		// Reset the collection for the entry parser and query generator
		$this->queryGenerator->setCollection($this->collection);
		$this->entryParser->setCollection($this->collection);
	}

	/**
	 * Parse the entries
	 *
	 * @param array $entries
	 * @param array $mappedRelationships
	 * @return array
	 */
	private function parseEntries(array $entries, array $mappedRelationships = []): array
	{
		return $this->entryParser->parse($entries, $mappedRelationships);
	}

	/**
	 * Get pagination info object
	 *
	 * @return array
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getPaginationInfo(): array
	{
		return $this->queryGenerator->getPaginationInfo();
	}
}
