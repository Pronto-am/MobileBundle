<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class SelectClause implements Clause
{
    private array $columns;

    public function __construct(array $columns)
    {
        $this->columns = $columns;
    }

    public function addToQuery(QueryBuilder &$query): void
    {
        $query->select(implode(', ', $this->columns));
    }
}
