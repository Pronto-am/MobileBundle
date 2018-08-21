<?php

namespace Pronto\MobileBundle\Service\Collection;


use Doctrine\DBAL\Driver\Statement;
use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Utils\Collect;
use Symfony\Component\HttpFoundation\RequestStack;

class QueryGenerator
{
	public const TABLE_COLUMNS = ['id', 'created_at', 'updated_at', 'created_by_id', 'updated_by_id'];

	/** @var EntityManagerInterface $entityManager */
	private $entityManager;

	/** @var null|\Symfony\Component\HttpFoundation\Request $request */
	private $request;

	/** @var Collection $collection */
	private $collection;

	/** @var array $collectionRelationships */
	private $collectionRelationships;

	/** @var array $properties */
	private $properties;

	/** @var string $orderBy */
	private $orderBy;

	/** @var string $direction */
	private $direction;

	/** @var int $offset */
	private $offset;

	/** @var int $limit */
	private $limit;

	/** @var array $propertyFilters */
	private $propertyFilters;

	/** @var array $relationshipFilters */
	private $relationshipFilters;

	/** @var bool $listView */
	private $listView = false;


	/**
	 * QueryGenerator constructor.
	 * @param EntityManagerInterface $entityManager
	 * @param RequestStack $requestStack
	 */
	public function __construct(EntityManagerInterface $entityManager, RequestStack $requestStack)
	{
		$this->entityManager = $entityManager;
		$this->request = $requestStack->getCurrentRequest();
	}


	/**
	 * Set the collection for the queries
	 *
	 * @param Collection $collection
	 */
	public function setCollection(Collection $collection): void
	{
		$this->collection = $collection;

		$this->mapProperties();
	}


	/**
	 * Map the properties of the collection
	 */
	private function mapProperties(): void
	{
		// Create a properties array of this relationship
		$this->properties = Collect::changeArrayKey($this->collection->getProperties()->getValues(), 'identifier');
	}


	/**
	 * Parse the query from the HTTP request
	 */
	public function parseHttpQuery(): void
	{
		$query = $this->request->query;

		$this->offset = $query->getInt('offset', 0);
		$this->limit = $query->getInt('limit', 25);

		$this->orderBy = $query->get('order_by', 'created_at');
		$this->direction = $query->get('direction', 'ASC');

		$this->propertyFilters = Collect::excludeKeys($query->all(), ['offset', 'limit', 'order_by', 'direction']);

		$this->validateQueryParameters();
	}


	/**
	 * Validate the http query parameters to be used inside the query
	 */
	private function validateQueryParameters(): void
	{
		// Get the identifiers of the relationships of this collection
		$this->collectionRelationships = $relationships = array_reduce($this->collection->getRelationships()->getValues(), function ($result, $relationship) {
			/** @var Collection\Relationship $relationship */
			$result[$relationship->getIdentifier()] = $relationship;

			return $result;
		}, []);

		// These are relationship names that can be used as filter
		$this->relationshipFilters = array_filter($this->propertyFilters, function ($filter) use ($relationships) {
			return array_key_exists($filter, $relationships);
		}, ARRAY_FILTER_USE_KEY);

		// These are the column names that can be used in the query
		$validColumnNames = array_merge(self::TABLE_COLUMNS, array_keys($this->properties));

		// Filter out non-existing columns
		$this->propertyFilters = array_filter($this->propertyFilters, function ($key) use ($validColumnNames) {
			return \in_array($key, $validColumnNames, true);
		}, ARRAY_FILTER_USE_KEY);

		// Validate the order by column and direction
		$this->orderBy = \in_array($this->orderBy, $validColumnNames, true) ? $this->orderBy : 'created_at';
		$this->direction = \in_array(strtoupper($this->direction), ['ASC', 'DESC']) ? strtoupper($this->direction) : 'ASC';
	}


	/**
	 * Get the count of the collection with filters
	 *
	 * @return int
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getEntryCount(): int
	{
		$parameters = [$this->collection->getId()];

		// Create the query
		$query = $this->createListQuery($parameters, true);

		// Surround the query with a new query to count the results
		$countQuery = 'SELECT COUNT(*) FROM (' . $query . ') as count';

		// Execute the query
		$statement = $this->executeStatement($countQuery, $parameters);

		return (int)$statement->fetchColumn(0);
	}


	/**
	 * Create a single result query
	 *
	 * @param array $queryParameters
	 * @return string
	 */
	private function createSingleResultQuery(array &$queryParameters): string
	{
		// Get the base query
		$query = $this->createBaseQuery();

		// Add the ID to the query
		$query .= 'AND entries.id = ? ';

		$queryParameters[] = $this->propertyFilters['id'];

		return $query;
	}


	/**
	 * Get a single entry
	 *
	 * @param string $id
	 * @return mixed
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getEntry(string $id)
	{
		// Manually add the ID to the filtering
		$this->propertyFilters['id'] = $id;

		$parameters = [$this->collection->getId()];

		$query = $this->createSingleResultQuery($parameters);

		// Execute the query
		$statement = $this->executeStatement($query, $parameters);

		$parsedEntry = $statement->fetchAll();

		return $parsedEntry[0] ?? null;
	}


	/**
	 * Get the entries
	 *
	 * @return mixed
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getEntries(): array
	{
		// Some actions after this depend on whether the results are for a listview or not
		$this->listView = true;

		$parameters = [$this->collection->getId()];

		$query = $this->createListQuery($parameters);

		// Execute the query
		$statement = $this->executeStatement($query, $parameters);

		// Parse the results of the query to a readable json object
		return $statement->fetchAll();
	}


	/**
	 * Get the related entries by ID's
	 *
	 * @param array $entryIds
	 * @return array
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getRelatedEntries(array $entryIds): array
	{
		// Don't query if the array is empty
		if (empty($entryIds)) {
			return [];
		}

		$entryIds = array_map(function ($id) {
			return '\'' . $id . '\'';
		}, $entryIds);

		$query = $this->createRelatedEntriesQuery($entryIds);

		// Execute the query
		$statement = $this->executeStatement($query, [$this->collection->getId()]);

		return $statement->fetchAll();
	}


	/**
	 * Execute a query statement
	 *
	 * @param string $query
	 * @param array $parameters
	 * @return Statement
	 * @throws \Doctrine\DBAL\DBALException
	 */
	private function executeStatement(string $query, array $parameters): Statement
	{
		// Execute the query
		$entityManager = $this->entityManager;
		$statement = $entityManager->getConnection()->prepare($query);
		$statement->execute($parameters);

		return $statement;
	}


	/**
	 * Get the query to retrieve the related entries
	 *
	 * @param $entryIds
	 * @return string
	 */
	private function createRelatedEntriesQuery($entryIds): string
	{
		// Get the base query
		$query = $this->createBaseQuery();

		// Add the ID to the query
		$query .= 'AND entries.id IN (' . implode(', ', $entryIds) . ') ';

		return $query;
	}


	/**
	 * Create the query for the collection retrieval
	 *
	 * @param array $queryParameters
	 * @param bool $countingEntries
	 * @return string
	 */
	private function createListQuery(array &$queryParameters, $countingEntries = false): string
	{
		// Get the base query
		$query = $this->createBaseQuery();

		$where = $having = [];

		// Use the filter as where or having clause, depending on the column
		foreach ($this->propertyFilters as $key => $value) {
			// Table columns need to be prefixed with 'entries.' and compared via WHERE
			if (array_key_exists($key, self::TABLE_COLUMNS)) {
				$where['entries.' . $key] = $value;
			} else {
				$having[$key] = $value;
			}
		}

		// Add the where clauses for the regular table columns
		foreach ($where as $field => $value) {
			$query .= 'AND ' . $field . ' = ? ';

			$queryParameters[] = $value;
		}

		// Filter on relationship existence
		foreach ($this->relationshipFilters as $identifier => $entryId) {
			/** @var Collection\Relationship $relationship */
			$relationship = $this->collectionRelationships[$identifier];

			$query .= 'AND ';
			$query .= 'EXISTS (SELECT id FROM collection_relationship_mappers AS mappers WHERE mappers.entry_left_id = entries.id AND mappers.related_collection_id = ? AND mappers.entry_right_id = ? ) ';

			$queryParameters[] = $relationship->getRelatedCollection()->getId();
			$queryParameters[] = $entryId;
		}

		$first = true;

		// Add the having clauses for JSON extracted columns
		foreach ($having as $field => $value) {
			$query .= $first ? 'HAVING ' : 'AND ';
			$query .= $this->jsonUnquote($field) . ' = ? ';

			$queryParameters[] = $value;

			$first = false;
		}

		if ($countingEntries) {
			return $query;
		}

		// Prepend the table name when it's one of the table columns we are ordering on
		$orderBy = \in_array($this->orderBy, self::TABLE_COLUMNS, true) ? 'entries.' . $this->orderBy : $this->orderBy;

		// Finalize the query with ordering and pagination
		return $query . 'ORDER BY ' . $orderBy . ' ' . $this->direction . ' LIMIT ' . $this->limit . ' OFFSET ' . $this->offset;
	}


	/**
	 * Create the base query
	 *
	 * @return string
	 */
	private function createBaseQuery(): string
	{
		// Prefix the table columns with 'entries.'
		$tableColumns = array_map(function ($column) {
			return 'entries.' . $column;
		}, self::TABLE_COLUMNS);

		if ($this->listView) {
			// Filter out the properties that are not available to the listview
			$jsonColumns = array_filter($this->properties, function (Collection\Property $property) {
				return $property->getIncludeInJsonListView();
			});
		}

		// Create the select syntax for the json data column
		$jsonColumns = array_map(function (Collection\Property $property) {
			return $this->jsonUnquote($property->getIdentifier()) . ' AS `' . $property->getIdentifier() . '`';
		}, $jsonColumns ?? $this->properties);

		// Merge both of the above
		$columns = array_merge($tableColumns, $jsonColumns);

		// Create the select statement
		$select = implode(', ', $columns);

		// Create the query
		// We need the entries.data to be able to perform a HAVING query on it, when parsing the entry, the DATA object is removed
		return 'SELECT entries.data, ' . $select . ' FROM collection_entries AS entries WHERE entries.collection_id = ? AND entries.active = 1 ';
	}


	/**
	 * MariaDB JSON_UNQUOTE function
	 *
	 * @param $field
	 * @return string
	 */
	private function jsonUnquote($field): string
	{
		return 'JSON_UNQUOTE(JSON_EXTRACT(entries.data, "$.' . $field . '"))';
	}


	/**
	 * Get the pagination info object
	 *
	 * @return array
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getPaginationInfo(): array
	{
		return [
			'total'  => $this->getEntryCount(),
			'offset' => $this->offset,
			'limit'  => $this->limit
		];
	}
}