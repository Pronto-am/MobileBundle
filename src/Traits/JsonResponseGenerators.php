<?php

namespace Pronto\MobileBundle\Traits;

use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Pronto\MobileBundle\Utils\Responses\PaginatedResponse;
use Pronto\MobileBundle\Utils\Responses\ResponseInterface;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\HttpFoundation\JsonResponse;

trait JsonResponseGenerators
{
    public function successResponse($data = null, $message = null): JsonResponse
    {
        // Convert json to an array when necessary
        $data = is_string($data) ? json_decode($data, true) : $data;

        $response = new SuccessResponse();
        $response->setData($data)->setMessage($message)->create();

        return $this->response($response);
    }

    private function response(ResponseInterface $response): JsonResponse
    {
        return $response->getJsonResponse();
    }

    public function paginatedResponse($data = null, $pagination = null): JsonResponse
    {
        $data = is_string($data) ? json_decode($data, true) : $data;

        $response = new PaginatedResponse();
        $response->setPagination($pagination)->setData($data)->create();

        return $this->response($response);
    }

    /**
     * 422 - Query parameters missing
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
