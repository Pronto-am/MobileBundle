<?php

namespace Pronto\MobileBundle\Service;

use Opis\JsonSchema\Schema;
use Opis\JsonSchema\Validator;
use Pronto\MobileBundle\Exception\InvalidRequestException;
use Symfony\Component\HttpFoundation\ParameterBag;

class ValidatorService
{
	/**
	 * @var Validator $validator
	 */
	private $validator;

	/**
	 * ValidatorService constructor.
	 */
	public function __construct()
	{
		$this->validator = new Validator();
	}

	/**
	 * @param ParameterBag $parameterBag
	 * @param array $required
	 * @param array $rules
	 * @throws InvalidRequestException
	 */
	public function validate(ParameterBag $parameterBag, array $required, array $rules = []): void
	{
		$values = $this->parseToObject($parameterBag->all());

		// Validate the request
		$result = $this->validator->schemaValidation($values, Schema::fromJsonString(json_encode([
			'type'       => 'object',
			'properties' => $rules,
			'required'   => $required
		])));

		if (!$result->isValid()) {
			throw new InvalidRequestException($result->getErrors());
		}
	}

	/**
	 * @param array $array
	 * @return object
	 */
	private function parseToObject(array $array)
	{
		return (object) json_decode(json_encode($array));
	}
}
