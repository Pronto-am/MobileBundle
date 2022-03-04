<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class WhereNotNullClause implements Clause
{
    private string $field;

    public function __construct(string $field)
    {
        $this->field = $field;
    }

    public function addToQuery(QueryBuilder &$query): void
    {
        $query->andWhere($this->field . ' IS NOT NULL');
    }
}
