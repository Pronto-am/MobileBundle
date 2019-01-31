<?php

namespace Pronto\MobileBundle\Utils\Responses;


use Symfony\Component\HttpFoundation\JsonResponse;

interface ResponseInterface
{
	/**
	 * @param null|string $message
	 * @return self
	 */
	public function setMessage(?string $message): self;


	/**
	 * @return string|null
	 */
	public function getMessage(): ?string;


	/**
	 * @param int $status
	 * @return self
	 */
	public function setStatus(int $status): self;


	/**
	 * @return int
	 */
	public function getStatus(): int;


	/**
	 * @param array|null $data
	 * @return self
	 */
	public function setData($data): ResponseInterface;


	/**
	 * @return array|string
	 */
	public function getData();


	/**
	 * Create the final content object
	 */
	public function create(): void;


	/**
	 * Generate the JsonResponse
	 *
	 * @return JsonResponse
	 */
	public function getJsonResponse(): JsonResponse;
}