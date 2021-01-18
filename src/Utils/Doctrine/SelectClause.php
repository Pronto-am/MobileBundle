<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class SelectClause implements Clause
{
    /** @var array $columns */
    private $columns;

    /**
     * SelectClause constructor.
     * @param array $columns
     */
    public function __construct(array $columns)
    {
        $this->columns = $columns;
    }

    /**
     * Add the clause to the query
     *
     * @param QueryBuilder $query
     * @return void
     */
    public function addToQuery(&$query): void
    {
        $query->select(implode(', ', $this->columns));
    }
}
