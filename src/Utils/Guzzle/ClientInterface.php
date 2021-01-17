<?php

namespace Pronto\MobileBundle\Utils\Guzzle;


use Psr\Http\Message\ResponseInterface;

interface ClientInterface
{
	/** Methods */
	public const METHOD_GET = 'GET';
	public const METHOD_POST = 'POST';
	public const METHOD_PUT = 'PUT';
	public const METHOD_DELETE = 'DELETE';


    /**
     * Set the base url
     *
     * @param string $baseUrl
     */
	public function setBaseUrl(string $baseUrl): void;


	/**
	 * Get the headers for the request
	 *
	 * @return array
	 */
	public function getHeaders() : array;


	/**
	 * Set the headers for the request
	 *
	 * @param array $headers
	 */
	public function setHeaders(array $headers = []);


	/**
	 * Get the query for the request
	 *
	 * @return array
	 */
	public function getQuery() : array;


	/**
	 * Set the query for the request
	 *
	 * @param array $query
	 */
	public function setQuery(array $query = []) : void;


	/**
	 * Add a query parameter to the request
	 *
	 * @param array $parameters
	 */
	public function addQueryParameter(array $parameters = []): void;


	/**
	 * Set the json body for the request
	 *
	 * @param array $body
	 */
	public function setBody(array $body = []): void;


	/**
	 * Generate the config for the request
	 *
	 * @return array
	 */
	public function getConfig() : array;


	/**
	 * Send the request to the api
	 *
	 * @param string $endpoint
	 * @param string $method
	 * @return mixed|ResponseInterface
	 */
	public function send(string $endpoint = '', string $method = 'get');


	/**
	 * Parse the response
	 * @param ResponseInterface $response
	 * @return mixed
	 */
	public function parseResponse(ResponseInterface $response);
}