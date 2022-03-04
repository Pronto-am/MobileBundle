<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class GroupClause implements Clause
{
    private string $column;

    public function __construct(string $column)
    {
        $this->column = $column;
    }

    public function addToQuery(QueryBuilder &$query): void
    {
        $query->groupBy($this->column);
    }
}
