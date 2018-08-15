<?php

namespace Pronto\MobileBundle\Utils\Responses;


class SuccessResponse extends BaseResponse
{
	/**
	 * SuccessResponse constructor.
	 */
	public function __construct()
	{
		$this->setStatus(200);
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

		if ($this->getMessage() !== null) {
			$response['message'] = $this->getMessage();
		}

		$this->setContent($response);
	}
}