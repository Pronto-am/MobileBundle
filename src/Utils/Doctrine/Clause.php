<?php

namespace Pronto\MobileBundle\Utils\Doctrine;

use Doctrine\ORM\QueryBuilder;

interface Clause
{
    /**
     * Add the clause to the query
     */
    public function addToQuery(QueryBuilder &$query): void;
}
