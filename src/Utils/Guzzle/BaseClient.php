<?php

namespace Pronto\MobileBundle\Utils\Guzzle;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

class BaseClient implements ClientInterface
{
    private string $baseUrl = '';
    private array $headers = [];
    private array $query = [];
    private array $body = [];

    public function setBaseUrl(string $baseUrl): void
    {
        $this->baseUrl = $baseUrl;
    }

    public function addQueryParameter(array $parameters = []): void
    {
        $this->query = array_merge($this->query, $parameters);
    }

    public function setBody(array $body = []): void
    {
        $this->body = $body;
    }

    /**
     * @throws GuzzleException
     */
    public function send(string $endpoint = '', string $method = 'GET')
    {
        $client = new Client([
            'base_uri'    => $this->baseUrl,
            'timeout'     => 10.0,
            'http_errors' => false
        ]);

        $config = $this->getConfig();

        if (!empty($this->body) && $method !== self::METHOD_GET) {
            $config['json'] = $this->body;
        }

        // Perform the request
        $response = $client->request($method, $endpoint, $config);

        return $this->parseResponse($response);
    }

    public function getConfig(): array
    {
        return [
            'query'   => $this->getQuery(),
            'headers' => $this->getHeaders()
        ];
    }

    public function getQuery(): array
    {
        return $this->query;
    }

    public function setQuery(array $query = []): void
    {
        $this->query = $query;
    }

    public function getHeaders(): array
    {
        // Always send request as json
        return array_merge([
            'Content-Type' => 'application/json'
        ], $this->headers);
    }

    public function setHeaders(array $headers = []): void
    {
        $this->headers = $headers;
    }

    public function parseResponse(ResponseInterface $response)
    {
        return $response;
    }
}
