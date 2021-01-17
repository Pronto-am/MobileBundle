<?php

namespace Pronto\MobileBundle\Service;


use Symfony\Component\HttpFoundation\Request;

class RequestBodyValidator
{
	/**
	 * @var array Missing
	 */
	private $missing = [];

	/**
	 * Validate the existence of the required keys in the JSON body
	 *
	 * @param Request $request
	 * @param array $required
	 * @return bool
	 */
	public function isValid(Request $request, array $required): bool
	{
		$jsonKeys = array_keys($request->request->all());

		// Get the missing keys
		$this->missing = array_diff($required, $jsonKeys);

		return empty($this->missing);
	}

	/**
	 * Get the validation message
	 *
	 * @return string
	 */
	public function getMessage(): string
	{
		if (empty($this->missing)) {
			return 'All required keys are present';
		}

		return 'Not all required keys are present, please provide: ' . implode(', ', $this->missing);
	}
}
