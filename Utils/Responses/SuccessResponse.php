<?php

namespace Pronto\MobileBundle\Utils\Responses;


class SuccessResponse extends BaseResponse
{
	/**
	 * SuccessResponse constructor.
	 * @param array|null $data
	 */
	public function __construct(array $data = null)
	{
		$this->setStatus(200);

		if($data !== null) {
			$this->setData($data);
		}
	}


	/**
	 * Create the response object
	 *
	 * @return self
	 */
	public function create(): ResponseInterface
	{
		$response = [];

		if ($this->getData() !== null) {
			$response['data'] = is_string($this->getData()) ? json_decode($this->getData()) : $this->getData();
		}

		if ($this->getMessage() !== null) {
			$response['message'] = $this->getMessage();
		}

		$this->setContent($response);

		return $this;
	}
}