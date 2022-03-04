<?php

namespace Pronto\MobileBundle\Utils\Guzzle;

use Psr\Http\Message\ResponseInterface;

class Endpoint
{
    private static array $instance = [];
    private ClientInterface $client;

    private function __construct(ClientInterface $client)
    {
        $this->client = $client;
    }

    public static function getInstance(ClientInterface $client): self
    {
        $class = static::class;

        if (!isset(self::$instance[$class])) {
            self::$instance[$class] = new $class($client);
        }

        return self::$instance[$class];
    }

    /**
     * @return mixed|ResponseInterface
     */
    public function requestGet(string $endpoint, array $query = [])
    {
        $this->client->addQueryParameter($query);

        return $this->client->send($endpoint);
    }

    /**
     * @return mixed|ResponseInterface
     */
    public function requestPost(string $endpoint, array $body, array $query = [])
    {
        $this->client->setBody($body);

        $this->client->addQueryParameter($query);

        return $this->client->send($endpoint, $this->client::METHOD_POST);
    }

    /**
     * @return mixed|ResponseInterface
     */
    public function requestPut(string $endpoint, array $body)
    {
        $this->client->setBody($body);

        return $this->client->send($endpoint, $this->client::METHOD_PUT);
    }

    /**
     * @return mixed|ResponseInterface
     */
    public function requestDelete(string $endpoint, array $body = [])
    {
        if (!empty($body)) {
            $this->client->setBody($body);
        }

        return $this->client->send($endpoint, $this->client::METHOD_DELETE);
    }

    public function request(string $endpoint, string $method = 'GET', array $query = [], array $body = []): void
    {
        // Provide parameters and body when they are set
        if (!empty($query)) {
            $this->client->addQueryParameter($query);
        }

        if (!empty($body)) {
            $this->client->setBody($body);
        }

        // Perform the request
        $this->client->send($endpoint, $method);
    }
}
