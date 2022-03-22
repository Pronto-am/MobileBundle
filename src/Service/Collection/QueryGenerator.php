<?php

namespace Pronto\MobileBundle\Service\Collection;

use Doctrine\DBAL\Driver\Statement;
use Doctrine\DBAL\Exception;
use Doctrine\DBAL\ParameterType;
use Doctrine\DBAL\Result;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\Parameter;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Utils\Collect;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use function in_array;

class QueryGenerator
{
    public const TABLE_COLUMNS = ['id', 'created_at', 'updated_at', 'created_by_id', 'updated_by_id'];

    private EntityManagerInterface $entityManager;
    private ?Request $request;
    private Collection $collection;
    private array $collectionRelationships;
    private array $properties;
    private string $orderBy;
    private string $direction;
    private int $offset;
    private int $limit;
    private array $propertyFilters;
    private array $relationshipFilters;
    private bool $listView = false;

    public function __construct(EntityManagerInterface $entityManager, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->request = $requestStack->getCurrentRequest();
    }

    public function setCollection(Collection $collection): void
    {
        $this->collection = $collection;

        $this->mapProperties();
    }

    private function mapProperties(): void
    {
        // Create a properties array of this relationship
        $this->properties = Collect::keyBy($this->collection->getProperties()->getValues(), 'identifier');
    }

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
            return in_array($key, $validColumnNames, true);
        }, ARRAY_FILTER_USE_KEY);

        // Map the property filters to a consistent array
        // Filters can be sent as: ?name=value or ?name[gte]=value, which results in ['name' => 'value'] and ['name' => ['gte' => 'value']]
        // All filters must be mapped to the last option
        $this->propertyFilters = array_map(function ($filter) {
            if (is_string($filter)) {
                return ['=' => $filter];
            }

            // Replace operands like 'gte' with '>='
            return array_reduce(array_keys($filter), function ($result, $key) use ($filter) {
                switch ($key) {
                    case 'e':
                        $result['='] = $filter[$key];
                        break;
                    case 'gt':
                        $result['>'] = $filter[$key];
                        break;
                    case 'gte':
                        $result['>='] = $filter[$key];
                        break;
                    case 'lt':
                        $result['<'] = $filter[$key];
                        break;
                    case 'lte':
                        $result['<='] = $filter[$key];
                        break;
                    case 'lk':
                        $result['LIKE'] = $filter[$key];
                        break;
                }

                return $result;
            }, []);
        }, $this->propertyFilters);

        // Validate the order by column and direction
        $this->orderBy = in_array($this->orderBy, $validColumnNames, true) ? $this->orderBy : 'created_at';
        $this->direction = in_array(strtoupper($this->direction), ['ASC', 'DESC']) ? strtoupper($this->direction) : 'ASC';
    }

    /**
     * @throws Exception
     */
    public function getEntry(string $id)
    {
        // Manually add the ID to the filtering
        $this->propertyFilters['id'] = ['=' => $id];

        $parameters = [
            new Parameter('collection_id', $this->collection->getId(), Types::INTEGER),
        ];

        $query = $this->createSingleResultQuery($parameters);

        // Execute the query
        $statement = $this->executeStatement($query, $parameters);

        $parsedEntry = $statement->fetchAllAssociative();

        return $parsedEntry[0] ?? null;
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
        $query .= 'AND entries.id = :entry_id ';

        $queryParameters[] = new Parameter('entry_id', $this->propertyFilters['id']['='], Types::STRING);

        return $query;
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
        return 'SELECT entries.data, ' . $select . ' FROM collection_entries AS entries WHERE entries.collection_id = :collection_id AND entries.active = 1 ';
    }

    /**
     * MariaDB JSON_UNQUOTE function
     *
     * @param string $field
     * @return string
     */
    private function jsonUnquote(string $field): string
    {
        return 'JSON_UNQUOTE(JSON_EXTRACT(entries.data, "$.' . $field . '"))';
    }

    /**
     * @throws Exception
     */
    private function executeStatement(string $query, array $parameters): Result
    {
        // Execute the query
        $entityManager = $this->entityManager;
        $statement = $entityManager->getConnection()->prepare($query);

        /** @var Parameter $parameter */
        foreach ($parameters as $parameter) {
            $statement->bindValue(
                $parameter->getName(),
                $parameter->getValue(),
                $parameter->getType() === Types::FLOAT
                    ? ParameterType::INTEGER
                    : ParameterType::STRING
            );
        }

        return $statement->executeQuery();
    }

    /**
     * @throws Exception
     */
    public function getEntries(): array
    {
        // Some actions after this depend on whether the results are for a listview or not
        $this->listView = true;

        $parameters = [
            new Parameter('collection_id', $this->collection->getId(), Types::INTEGER),
        ];

        $query = $this->createListQuery($parameters);

        // Execute the query
        $statement = $this->executeStatement($query, $parameters);

        // Parse the results of the query to a readable json object
        return $statement->fetchAllAssociative();
    }

    private function createListQuery(array &$queryParameters, bool $countingEntries = false): string
    {
        // Get the base query
        $query = $this->createBaseQuery();

        $where = $having = [];

        // Use the filter as where or having clause, depending on the column
        foreach ($this->propertyFilters as $key => $filter) {
            // Table columns need to be prefixed with 'entries.' and compared via WHERE
            if (in_array($key, self::TABLE_COLUMNS)) {
                $where['entries.' . $key] = $filter;
            } else {
                $having[$key] = $filter;
            }
        }

        $parameterIndex = 0;

        // Add the where clauses for the regular table columns
        foreach ($where as $field => $filter) {
            foreach ($filter as $operand => $value) {
                $query .= sprintf('AND %s %s %s ', $field, $operand, ':p' . $parameterIndex);

                $queryParameters[] = new Parameter('p' . $parameterIndex, $value, Types::STRING);
                $parameterIndex++;
            }
        }

        // Filter on relationship existence
        foreach ($this->relationshipFilters as $identifier => $entryId) {
            /** @var Collection\Relationship $relationship */
            $relationship = $this->collectionRelationships[$identifier];

            $query .= 'AND ';
            $query .= sprintf('EXISTS (SELECT id FROM collection_relationship_mappers AS mappers WHERE mappers.entry_left_id = entries.id AND mappers.related_collection_id = :p%s AND mappers.entry_right_id = :p%s ) ', $parameterIndex, $parameterIndex + 1);

            $queryParameters[] = new Parameter('p' . $parameterIndex, $relationship->getRelatedCollection()->getId(), Types::STRING);
            $queryParameters[] = new Parameter('p' . ($parameterIndex + 1), $entryId, Types::STRING);

            $parameterIndex += 2;
        }

        $first = true;

        // Add the having clauses for JSON extracted columns
        foreach ($having as $field => $filter) {
            foreach ($filter as $operand => $value) {
                $query .= $first ? 'HAVING ' : 'AND ';

                // A field can be translatable, so can either be stored like: "field": "value" OR "field": {"nl": "value", "en": "value"}.
                // So, search by $.field or $.field.* in case the field is translatable. This is allowed and doesn't result in errors for non object fields.
                $leftSide = sprintf('%s %s %s', $this->jsonUnquote($field), $operand, ':p' . $parameterIndex . '_1');
                $rightSide = sprintf('%s %s %s', $this->jsonUnquote($field . '.*'), $operand, ':p' . $parameterIndex . '_2');
                $query .= sprintf('(%s OR %s) ', $leftSide, $rightSide);

                $type = Types::STRING;
                if (in_array($operand, ['>', '>=', '<', '<='])) {
                    $type = Types::FLOAT;
                }

                // Two OR statements with the same value bound
                $queryParameters[] = new Parameter('p' . $parameterIndex . '_1', $value, $type);
                $queryParameters[] = new Parameter('p' . $parameterIndex . '_2', $value, $type);

                $first = false;

                $parameterIndex++;
            }
        }

        if ($countingEntries) {
            return $query;
        }

        // Prepend the table name when it's one of the table columns we are ordering on
        $orderBy = in_array($this->orderBy, self::TABLE_COLUMNS, true) ? 'entries.' . $this->orderBy : $this->orderBy;

        // Finalize the query with ordering and pagination
        return $query . 'ORDER BY ' . $orderBy . ' ' . $this->direction . ' LIMIT ' . $this->limit . ' OFFSET ' . $this->offset;
    }

    /**
     * @throws Exception
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

        $parameters = [
            new Parameter('collection_id', $this->collection->getId(), Types::INTEGER),
        ];

        // Execute the query
        $statement = $this->executeStatement($query, $parameters);

        return $statement->fetchAllAssociative();
    }

    private function createRelatedEntriesQuery($entryIds): string
    {
        // Get the base query
        $query = $this->createBaseQuery();

        // Add the ID to the query
        $query .= 'AND entries.id IN (' . implode(', ', $entryIds) . ') ';

        return $query;
    }

    public function getPaginationInfo(): array
    {
        return [
            'total'  => $this->getEntryCount(),
            'offset' => $this->offset,
            'limit'  => $this->limit
        ];
    }

    /**
     * @throws Exception
     */
    public function getEntryCount(): int
    {
        $parameters = [
            new Parameter('collection_id', $this->collection->getId(), Types::INTEGER),
        ];

        // Create the query
        $query = $this->createListQuery($parameters, true);

        // Surround the query with a new query to count the results
        $countQuery = 'SELECT COUNT(*) FROM (' . $query . ') as count';

        // Execute the query
        $statement = $this->executeStatement($countQuery, $parameters);

        return (int)$statement->fetchFirstColumn();
    }
}
