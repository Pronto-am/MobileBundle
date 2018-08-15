<?php

namespace Pronto\MobileBundle\Utils\Doctrine;


class WhereClause implements Clause
{
	/** @var string $field */
	private $field;

	/** @var mixed $parameter */
	private $parameter;

	/** @var string $type */
	private $type;


	/**
	 * WhereClause constructor.
	 * @param string $field
	 * @param $parameter
	 * @param string $type
	 */
	public function __construct(string $field, $parameter, string $type = '=')
	{
		$this->field = $field;
		$this->parameter = $parameter;
		$this->type = $type;
	}

	/**
	 * Add the clause to the query
	 *
	 * @param \Doctrine\ORM\QueryBuilder $query
	 * @return mixed|void
	 */
	public function addToQuery(&$query)
	{
		$field = explode('.', $this->field);
		$parameter = end($field);

		$query->andWhere($this->field . ' ' . $this->type . ' :' . $parameter);
		$query->setParameter($parameter, $this->parameter);
	}
}