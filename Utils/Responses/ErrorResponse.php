<?php

namespace Pronto\MobileBundle\Utils\Responses;

class ErrorResponse extends BaseResponse
{
	// Possible error messages
	public const NOT_FOUND = [404, '{entity} not found'];
	public const INVALID_PARAMETERS = [422, 'Not all of the required parameters are present'];
	public const NO_AUTHORIZATION_HEADER = [401, 'No authorization header present'];
	public const NOT_AUTHORIZED = [403, 'You are not authorized to perform this request'];
	public const INVALID_AUTHORIZATION_HEADER = [401, 'Authorization token could not be parsed from the authorization header'];
	public const INVALID_AUTHORIZATION_TOKEN = [401, 'Invalid authorization token'];
	public const INVALID_PLUGIN_STATE = [403, 'The plugin is not activated for this account'];

	// Other messages
	public const NO_MESSAGE_PROVIDED = [400, 'No message provided for the error code'];


	/** @var string $entity */
	private $entity;


	/**
	 * ErrorResponse constructor.
	 * @param array $error
	 */
	public function __construct(array $error)
	{
		$this->parseError($error);
	}


	/**
	 * Set the error
	 *
	 * @param array $error
	 */
	public function setError(array $error): void
	{
		$this->parseError($error);
	}


	/**
	 * @param array $error
	 */
	private function parseError(array $error): void
	{
		[$status, $message] = $error;

		$this->setStatus($status);
		$this->setMessage($message);
	}


	/**
	 * @param string $entity
	 * @return ErrorResponse
	 */
	public function forEntity(string $entity): self
	{
		$this->entity = $entity;

		return $this;
	}


	/**
	 * Create the error message body
	 *
	 * @return self
	 */
	public function create(): ResponseInterface
	{
		// Parse the entities name into the message if it's set
		if ($this->entity !== null) {
			$className = explode('\\', $this->entity);

			$message = str_replace('{entity}', end($className), $this->getMessage());
		}

		// Generate the main content
		$content = [
			'error' => [
				'code'    => $this->getStatus(),
				'message' => $message ?? $this->getMessage()
			]
		];

		// Set the optional data
		if ($this->getData() !== null) {
			$content['data'] = $this->getData();
		}

		$this->setContent($content);

		return $this;
	}
}