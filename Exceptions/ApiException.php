<?php

namespace Pronto\MobileBundle\Exceptions;


use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Exception;
use Throwable;

class ApiException extends Exception
{

	/** @var ErrorResponse */
	private $response;


	/**
	 * ApiException constructor.
	 * @param ErrorResponse $response
	 * @param Throwable|null $previous
	 */
	public function __construct(ErrorResponse $response, Throwable $previous = null)
	{
		$this->response = $response;

		parent::__construct($response->getMessage(), $response->getStatus(), $previous);
	}


	/**
	 * Get the SuccessResponse
	 *
	 * @return ErrorResponse
	 */
	public function getResponse(): ErrorResponse
	{
		return $this->response;
	}
}