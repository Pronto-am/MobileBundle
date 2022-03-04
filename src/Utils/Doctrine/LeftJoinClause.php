<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class LeftJoinClause implements Clause
{
    private string $field;
    private string $alias;
    private ?string $conditionType;
    private ?string $condition;

    public function __construct(string $field, string $alias, string $conditionType = null, string $condition = null)
    {
        $this->field = $field;
        $this->alias = $alias;
        $this->conditionType = $conditionType;
        $this->condition = $condition;
    }

    public function addToQuery(QueryBuilder &$query): void
    {
        $query->leftJoin($this->field, $this->alias, $this->conditionType, $this->condition);
    }
}
