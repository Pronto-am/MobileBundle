<?php

namespace Pronto\MobileBundle\Utils\Guzzle;


class Endpoint
{

	/** @var ClientInterface $client */
	private $client;

	/** @var array $instance Array of instances */
	private static $instance = [];


	/**
	 * Get an endpoint instance
	 *
	 * @param ClientInterface $client
	 * @return self
	 */
	public static function getInstance(ClientInterface $client): self
	{
		$class = static::class;

		if(!isset(self::$instance[$class])) {
			self::$instance[$class] = new $class($client);
		}

		return self::$instance[$class];
	}


	/**
	 * Endpoint constructor.
	 *
	 * @param ClientInterface $client
	 */
	private function __construct(ClientInterface $client)
	{
		$this->client = $client;
	}


	/**
	 * Perform GET request
	 *
	 * @param $endpoint
	 * @param array $query
	 * @return mixed|\Psr\Http\Message\ResponseInterface
	 */
	public function requestGet(string $endpoint, array $query = [])
	{
		$this->client->addQueryParameter($query);

		return $this->client->send($endpoint);
	}


	/**
	 * Perform POST request
	 *
	 * @param $endpoint
	 * @param array $body
	 * @param array $query
	 * @return mixed|\Psr\Http\Message\ResponseInterface
	 */
	public function requestPost(string $endpoint, array $body, array $query = [])
	{
		$this->client->setBody($body);

		$this->client->addQueryParameter($query);

		return $this->client->send($endpoint, $this->client::METHOD_POST);
	}


	/**
	 * Perform PUT request
	 *
	 * @param $endpoint
	 * @param array $body
	 * @return mixed|\Psr\Http\Message\ResponseInterface
	 */
	public function requestPut(string $endpoint, array $body)
	{
		$this->client->setBody($body);

		return $this->client->send($endpoint, $this->client::METHOD_PUT);
	}


	/**
	 * Perform DELETE request
	 *
	 * @param $endpoint
	 * @param array $body
	 * @return mixed|\Psr\Http\Message\ResponseInterface
	 */
	public function requestDelete(string $endpoint, array $body = [])
	{
		if (!empty($body)) {
			$this->client->setBody($body);
		}

		return $this->client->send($endpoint, $this->client::METHOD_DELETE);
	}


	/**
	 * Perform a customizable request
	 *
	 * @param string $endpoint
	 * @param string $method
	 * @param array $query
	 * @param array $body
	 */
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