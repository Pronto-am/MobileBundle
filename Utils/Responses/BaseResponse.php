<?php

namespace Pronto\MobileBundle\Utils\Responses;


use Symfony\Component\HttpFoundation\JsonResponse;

class BaseResponse implements ResponseInterface
{
	/** @var string $message */
	private $message;

	/** @var array $data */
	private $data;

	/** @var integer $status */
	private $status;

	/** @var array $content */
	private $content;


	/**
	 * @param int $status
	 * @return self
	 */
	public function setStatus(int $status): ResponseInterface
	{
		$this->status = $status;

		return $this;
	}


	/**
	 * @return int
	 */
	public function getStatus(): int
	{
		return $this->status;
	}


	/**
	 * @param string|null $message
	 * @return BaseResponse
	 */
	public function setMessage(?string $message): ResponseInterface
	{
		$this->message = $message;

		return $this;
	}


	/**
	 * @return string|null
	 */
	public function getMessage(): ?string
	{
		return $this->message;
	}


	/**
	 * @param array|null $data
	 * @return BaseResponse
	 */
	public function setData(?array $data): ResponseInterface
	{
		$this->data = $data;

		return $this;
	}


	/**
	 * @return array|string
	 */
	public function getData()
	{
		return $this->data;
	}


	/**
	 * @param array $content
	 */
	public function setContent(array $content): void
	{
		$this->content = $content;
	}


	/**
	 * Create the final content object
	 * @return self;
	 */
	public function create(): ResponseInterface
	{
		$this->content = [];
	}


	/**
	 * Generate the JsonResponse
	 *
	 * @return JsonResponse
	 */
	public function getJsonResponse(): JsonResponse
	{
		// Return a new JsonResponse
		return new JsonResponse($this->content, $this->getStatus());
	}
}