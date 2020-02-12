<?php

namespace Pronto\MobileBundle\Traits;


use Pronto\MobileBundle\Exception\ApiException;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Pronto\MobileBundle\Utils\Responses\PaginatedResponse;
use Pronto\MobileBundle\Utils\Responses\ResponseInterface;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\HttpFoundation\JsonResponse;

trait JsonResponseGenerators
{

	/**
	 * Generate a json response
	 *
	 * @param ResponseInterface $response
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 */
	private function response(ResponseInterface $response): JsonResponse
	{
		return $response->getJsonResponse();
	}


	/**
	 * 200 - OK
	 *
	 * @param mixed $data
	 * @param null $message
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 */
	public function successResponse($data = null, $message = null): JsonResponse
	{
		// Convert json to an array when necessary
		$data = is_string($data) ? json_decode($data, true) : $data;

		$response = new SuccessResponse();
		$response->setData($data)->setMessage($message)->create();

		return $this->response($response);
	}


	/**
	 * Return a paginated response
	 *
	 * @param null $data
	 * @param null $pagination
	 * @return JsonResponse
	 */
	public function paginatedResponse($data = null, $pagination = null): JsonResponse
	{
		$data = is_string($data) ? json_decode($data, true) : $data;

		$response = new PaginatedResponse();
		$response->setPagination($pagination)->setData($data)->create();

		return $this->response($response);
	}


	/**
	 * 500 - Custom error
	 *
	 * @param array $error
	 * @param string $entity
	 * @param null $data
	 * @return void
	 * @throws ApiException
	 */
	public function customErrorResponse(array $error, string $entity = '', $data = null): void
	{
		$data = is_string($data) ? json_decode($data, true) : $data;

		$response = new ErrorResponse($error);
		$response->forEntity($entity)->setData($data)->create();

		throw new ApiException($response);
	}


	/**
	 * 401 - Not authorized
	 *
	 * @return void
	 * @throws ApiException
	 */
	public function notAuthorizedResponse(): void
	{
		$response = new ErrorResponse(ErrorResponse::NOT_AUTHORIZED);
		$response->create();

		throw new ApiException($response);
	}


	/**
	 * 403 - Access denied
	 *
	 * @param array $error
	 * @return void
	 * @throws ApiException
	 */
	public function accessDeniedResponse(array $error): void
	{
		// Create the message
		$response = new ErrorResponse($error);
		$response->create();

		throw new ApiException($response);
	}


	/**
	 * 404 - Object not found
	 *
	 * @param string $entity
	 * @return void
	 * @throws ApiException
	 */
	public function objectNotFoundResponse(string $entity): void
	{
		$response = new ErrorResponse(ErrorResponse::NOT_FOUND);
		$response->forEntity($entity)->create();

		throw new ApiException($response);
	}


	/**
	 * 422 - Query parameters missing
	 *
	 * @param array|string $message
	 * @param string $entity
	 * @return void
	 * @throws ApiException
	 */
	public function invalidParametersResponse($message, string $entity = ''): void
	{
		// The provided parameter may be string or array
		$error = is_array($message) ? $message : [422, $message];

		$response = new ErrorResponse($error);
		$response->forEntity($entity)->create();

		throw new ApiException($response);
	}
}
