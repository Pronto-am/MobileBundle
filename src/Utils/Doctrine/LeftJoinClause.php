<?php

namespace Pronto\MobileBundle\Utils\Doctrine;


class LeftJoinClause implements Clause
{
	/** @var string $field */
	private $field;

    /** @var string $alias */
	private $alias;

	/** @var null|string $conditionType */
	private $conditionType;

	/** @var null|string $condition */
	private $condition;


	/**
	 * LeftJoinClause constructor.
	 * @param string $field
	 * @param string $alias
	 * @param string|null $conditionType
	 * @param string|null $condition
	 */
	public function __construct(string $field, string $alias, string $conditionType = null, string $condition = null)
	{
		$this->field = $field;
		$this->alias = $alias;
		$this->conditionType = $conditionType;
		$this->condition = $condition;
	}

	/**
	 * Add the clause to the query
	 *
	 * @param \Doctrine\ORM\QueryBuilder $query
	 * @return void
	 */
	public function addToQuery(&$query): void
	{
		$query->leftJoin($this->field, $this->alias, $this->conditionType, $this->condition);
	}
}