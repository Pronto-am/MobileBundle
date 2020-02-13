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
     * @param int $statusCode
     * @param array $headers
     * @return JsonResponse
     */
    public function response($data, int $statusCode = 200, array $headers = []): JsonResponse
    {
        return JsonResponse::create([
            'data' => $this->serializeData($data)
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
            'data'  => $this->serializeData($pagination->getData()),
            'meta'  => $pagination->getMeta(),
            'links' => $pagination->getLinks(),
        ], $statusCode, $headers);
    }

    /**
     * @param $data
     * @return mixed
     */
    private function serializeData($data)
    {
        return json_decode($this->serializer->serialize($data, [
            new DateTimeNormalizer()
        ]));
    }
}
