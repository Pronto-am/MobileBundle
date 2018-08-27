<?php

namespace Pronto\MobileBundle\Tests\Utils;


use PHPUnit\Framework\TestCase;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;

class ErrorResponseTest extends TestCase
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
}