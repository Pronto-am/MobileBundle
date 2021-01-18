<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class GroupClause implements Clause
{

    /** @var string $columns */
    private $column;

    /**
     * GroupClause constructor.
     * @param $column
     */
    public function __construct(string $column)
    {
        $this->column = $column;
    }

    /**
     * Add the clause to the query
     *
     * @param QueryBuilder $query
     * @return void
     */
    public function addToQuery(&$query): void
    {
        $query->groupBy($this->column);
    }
}
