<?php

namespace Pronto\MobileBundle\Exception;

use Exception;
use Throwable;

class InvalidRequestException extends Exception
{
	/**
	 * @var array $errors
	 */
	private $errors;


	/**
	 * InvalidRequestException constructor.
	 * @param array $errors
	 * @param Throwable|null $previous
	 */
	public function __construct(array $errors, Throwable $previous = null)
	{
		$this->errors = $errors;

		parent::__construct('Invalid Request', 422, $previous);
	}

	/**
	 * @return array
	 */
	public function getErrors(): array
	{
		return $this->errors;
	}
}
