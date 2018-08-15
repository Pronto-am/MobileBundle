<?php

namespace Pronto\MobileBundle\Utils\Doctrine;


class GroupClause implements Clause
{

	/** @var string $columns */
	private $column;


	public function __construct($column)
	{
		$this->column = $column;
	}

	/**
	 * Add the clause to the query
	 *
	 * @param \Doctrine\ORM\QueryBuilder $query
	 * @return mixed|void
	 */
	public function addToQuery(&$query)
	{
		$query->groupBy($this->column);
	}
}