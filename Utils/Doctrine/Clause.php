<?php

namespace Pronto\MobileBundle\Utils\Doctrine;


use Doctrine\ORM\QueryBuilder;

interface Clause
{
	/**
	 * Add the clause to the query
	 *
	 * @param QueryBuilder $query
	 * @return void
	 */
	public function addToQuery(&$query): void;
}