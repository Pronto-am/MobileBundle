<?php


namespace Pronto\MobileBundle\Traits;

use Pronto\MobileBundle\Service\JsonSerializer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

trait SerializeEntities
{
    /**
     * @var JsonSerializer $serializer
     */
    private $serializer;

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
            'data' => json_decode($this->serializer->serialize($data, [
                new DateTimeNormalizer()
            ]))
        ], $statusCode, array_merge([
            'Content-Type' => 'application/json'
        ], $headers));
    }
}
