<?php

namespace Pronto\MobileBundle\Utils\Doctrine;


class WhereNotNullClause implements Clause
{
	/** @var string $field */
	private $field;

	/**
	 * WhereNotNullClause constructor.
	 * @param string $field
	 */
	public function __construct(string $field)
	{
		$this->field = $field;
	}


	/**
	 * Add the clause to the query
	 *
	 * @param \Doctrine\ORM\QueryBuilder $query
	 * @return mixed|void
	 */
	public function addToQuery(&$query)
	{
		$query->andWhere($this->field . ' IS NOT NULL');
	}
}