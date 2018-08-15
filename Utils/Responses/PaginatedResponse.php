<?php

namespace Pronto\MobileBundle\Utils\Responses;

class PaginatedResponse extends BaseResponse
{
	/** @var array $pagination */
	private $pagination = [];


	/**
	 * SuccessResponse constructor.
	 */
	public function __construct()
	{
		$this->setStatus(200);
	}


	/**
	 * Set the pagination resources
	 *
	 * @param array $pagination
	 * @return PaginatedResponse
	 */
	public function setPagination(array $pagination): self
	{
		$this->pagination = $pagination;

		return $this;
	}


	/**
	 * Create the response object
	 *
	 * @return void
	 */
	public function create(): void
	{
		$response = [];

		if ($this->getData() !== null) {
			$response['data'] = is_string($this->getData()) ? json_decode($this->getData()) : $this->getData();
		}

		$response['pagination'] = $this->pagination;

		$this->setContent($response);
	}
}