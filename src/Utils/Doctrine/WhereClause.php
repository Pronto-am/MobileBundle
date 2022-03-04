<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

class WhereClause implements Clause
{
    private string $field;

    /** @var mixed $parameter */
    private $parameter;

    private string $type;

    public function __construct(string $field, $parameter, string $type = '=')
    {
        $this->field = $field;
        $this->parameter = $parameter;
        $this->type = $type;
    }

    public function addToQuery(QueryBuilder &$query): void
    {
        $field = explode('.', $this->field);
        $parameter = end($field);

        $query->andWhere($this->field . ' ' . $this->type . ' :' . $parameter);
        $query->setParameter($parameter, $this->parameter);
    }
}
