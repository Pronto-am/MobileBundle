<?php

namespace Pronto\MobileBundle\Tests\Utils;

use PHPUnit\Framework\TestCase;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Pronto\MobileBundle\Utils\Responses\PaginatedResponse;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;

class JsonResponseTest extends TestCase
{
	/**
	 * Test the error response without entity
	 */
	public function testCreateCustomErrorResponse(): void
	{
		$errorResponse = new ErrorResponse([422, 'This is a 422 HTTP error']);
		$errorResponse->create();

		$response = json_decode($errorResponse->getJsonResponse()->getContent(), true);

		$this->assertEquals([
			'error' => [
				'code'    => 422,
				'message' => 'This is a 422 HTTP error'
			]
		], $response);

		$this->assertEquals(422, $errorResponse->getJsonResponse()->getStatusCode());
	}


	/**
	 * Test the error response with entity
	 */
	public function testCreateCustomErrorResponseWithEntity(): void
	{
		$errorResponse = new ErrorResponse([422, 23, 'This is a 423 HTTP error with an entity']);
		$errorResponse->forEntity(Device::class)->create();

		$response = json_decode($errorResponse->getJsonResponse()->getContent(), true);

		$this->assertEquals([
			'error' => [
				'code'    => ErrorResponse::ERROR_CODE_PREFIXES[Device::class] . 23,
				'message' => 'This is a 423 HTTP error with an entity'
			]
		], $response);

		$this->assertEquals(422, $errorResponse->getJsonResponse()->getStatusCode());
	}


	/**
	 * Test the error response without entity
	 */
	public function testCreateCustomErrorResponseWithoutEntity(): void
	{
		$errorResponse = new ErrorResponse([422, 23, 'This is a 424 HTTP error without an entity']);
		$errorResponse->create();

		$response = json_decode($errorResponse->getJsonResponse()->getContent(), true);

		$this->assertEquals([
			'error' => [
				'code'    => 422,
				'message' => 'This is a 424 HTTP error without an entity'
			]
		], $response);

		$this->assertEquals(422, $errorResponse->getJsonResponse()->getStatusCode());
	}


	/**
	 * Test the object not found response with entity
	 */
	public function testCreateObjectNotFoundResponse(): void
	{
		$errorResponse = new ErrorResponse(ErrorResponse::NOT_FOUND);
		$errorResponse->forEntity(Collection::class)->create();

		$response = json_decode($errorResponse->getJsonResponse()->getContent(), true);

		$this->assertEquals([
			'error' => [
				'code'    => ErrorResponse::ERROR_CODE_PREFIXES[Collection::class] . '04',
				'message' => 'Collection not found'
			]
		], $response);

		$this->assertEquals(404, $errorResponse->getJsonResponse()->getStatusCode());
	}


	/**
	 * Test the object not found response with entity
	 */
	public function testSuccessResponse(): void
	{
		$successResponse = new SuccessResponse();
		$successResponse->setData([
			'object' => [
				'id'         => 12345,
				'identifier' => 'object-12345'
			]
		])->setMessage('This is the message')->create();

		$response = json_decode($successResponse->getJsonResponse()->getContent(), true);

		$this->assertEquals([
			'data'    => [
				'object' => [
					'id'         => 12345,
					'identifier' => 'object-12345'
				]
			],
			'message' => 'This is the message'
		], $response);

		$this->assertEquals(200, $successResponse->getJsonResponse()->getStatusCode());
	}


	/**
	 * Test the object not found response with entity
	 */
	public function testPaginatedResponse(): void
	{
		$successResponse = new PaginatedResponse();
		$successResponse->setPagination([
			'total'  => 23,
			'offset' => 0,
			'limit'  => 15
		])->setData([
			'object' => [
				'id'         => 12345,
				'identifier' => 'object-12345'
			]
		])->create();

		$response = json_decode($successResponse->getJsonResponse()->getContent(), true);

		$this->assertEquals([
			'data'       => [
				'object' => [
					'id'         => 12345,
					'identifier' => 'object-12345'
				]
			],
			'pagination' => [
				'total'  => 23,
				'offset' => 0,
				'limit'  => 15
			]
		], $response);

		$this->assertEquals(200, $successResponse->getJsonResponse()->getStatusCode());
	}
}
