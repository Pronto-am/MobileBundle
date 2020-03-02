<?php


namespace Pronto\MobileBundle\Traits;

use Pronto\MobileBundle\Service\JsonSerializer;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

trait SerializeEntities
{
    /**
     * @var JsonSerializer $serializer
     */
    protected $serializer;

    /**
     * @required
     * @param JsonSerializer $serializer
     */
    public function setJsonSerializer(JsonSerializer $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @param $data
     * @param array $normalizers
     * @param int $statusCode
     * @param array $headers
     * @return JsonResponse
     */
    public function response($data, array $normalizers = [], int $statusCode = 200, array $headers = []): JsonResponse
    {
        return JsonResponse::create([
            'data' => $this->serializeData($data, $normalizers)
        ], $statusCode, $headers);
    }

    /**
     * @param PaginationResponse $pagination
     * @param int $statusCode
     * @param array $headers
     * @return JsonResponse
     */
    public function paginatedResponse(PaginationResponse $pagination, int $statusCode = 200, array $headers = []): JsonResponse
    {
        return JsonResponse::create([
            'data'  => $this->serializeData($pagination->getData(), $pagination->getNormalizers()),
            'meta'  => $pagination->getMeta(),
            'links' => $pagination->getLinks(),
        ], $statusCode, $headers);
    }

    /**
     * @param $data
     * @param array $normalizers
     * @return mixed
     */
    private function serializeData($data, array $normalizers = [])
    {
        return json_decode($this->serializer->serialize($data, $normalizers));
    }
}
