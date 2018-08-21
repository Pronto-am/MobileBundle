<?php

namespace Pronto\MobileBundle\Utils\Doctrine;


class GroupClause implements Clause
{

	/** @var string $columns */
	private $column;


	/**
	 * GroupClause constructor.
	 * @param $column
	 */
	public function __construct($column)
	{
		$this->column = $column;
	}

	/**
	 * Add the clause to the query
	 *
	 * @param \Doctrine\ORM\QueryBuilder $query
	 * @return void
	 */
	public function addToQuery(&$query): void
	{
		$query->groupBy($this->column);
	}
}