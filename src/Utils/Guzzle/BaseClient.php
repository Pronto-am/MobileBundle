<?php

namespace Pronto\MobileBundle\Utils\Guzzle;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

class BaseClient implements ClientInterface
{

    /** @var string Base url of the API */
    private $baseUrl = '';

    /** @var array $headers */
    private $headers = [];

    /** @var array $query */
    private $query = [];

    /** @var array $body */
    private $body = [];

    /**
     * Set the base url
     *
     * @param string $baseUrl
     */
    public function setBaseUrl(string $baseUrl): void
    {
        $this->baseUrl = $baseUrl;
    }

    /**
     * Add parameters to the query
     *
     * @param array $parameters
     */
    public function addQueryParameter(array $parameters = []): void
    {
        $this->query = array_merge($this->query, $parameters);
    }

    /**
     * Set the json body for the request
     *
     * @param array $body
     */
    public function setBody(array $body = []): void
    {
        $this->body = $body;
    }

    /**
     * Send the request
     *
     * @param string $endpoint
     * @param string $method
     * @return mixed
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

    /**
     * Generate the config for the request
     *
     * @return array
     */
    public function getConfig(): array
    {
        return [
            'query'   => $this->getQuery(),
            'headers' => $this->getHeaders()
        ];
    }

    /**
     * Get the query for the request
     *
     * @return array
     */
    public function getQuery(): array
    {
        return $this->query;
    }

    /**
     * Set the query for the request
     *
     * @param array $query
     */
    public function setQuery(array $query = []): void
    {
        $this->query = $query;
    }

    /**
     * Generate the headers for the request
     *
     * @return array
     */
    public function getHeaders(): array
    {
        // Always send request as json
        return array_merge([
            'Content-Type' => 'application/json'
        ], $this->headers);
    }

    /**
     * Set the headers for the request
     *
     * @param array $headers
     */
    public function setHeaders(array $headers = []): void
    {
        $this->headers = $headers;
    }

    /**
     * Parse the response
     *
     * @param ResponseInterface $response
     * @return mixed
     */
    public function parseResponse(ResponseInterface $response)
    {
        return $response;
    }
}
