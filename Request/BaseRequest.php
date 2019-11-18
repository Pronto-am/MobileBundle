<?php

namespace Pronto\MobileBundle\Request;


use Pronto\MobileBundle\Exception\InvalidRequestException;
use Pronto\MobileBundle\Service\ValidatorService;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\RequestStack;

abstract class BaseRequest
{
	/**
	 * @var ParameterBag $parameterBag
	 */
	public $parameterBag;


	/**
	 * @var ValidatorService $validatorService
	 */
	private $validatorService;

	/**
	 * ResultRequest constructor.
	 * @param RequestStack $requestStack
	 * @param ValidatorService $validatorService
	 * @throws InvalidRequestException
	 */
	public function __construct(RequestStack $requestStack, ValidatorService $validatorService)
	{
		$this->parameterBag = $requestStack->getCurrentRequest()->request;
		$this->validatorService = $validatorService;

		$this->handle();
	}

	/**
	 * @return array
	 */
	abstract public function required(): array;

	/**
	 * @return array
	 */
	abstract public function rules(): array;

	/**
	 * @throws InvalidRequestException
	 */
	private function handle(): void
	{
		$this->validatorService->validate($this->parameterBag, $this->required(), $this->rules());
	}

	/**
	 * @param string $key
	 * @param null $default
	 * @return mixed
	 */
	public function get(string $key, $default = null)
	{
		return $this->parameterBag->get($key, $default);
	}

	/**
	 * @return array
	 */
	public function all(): array
	{
		return $this->parameterBag->all();
	}
}
