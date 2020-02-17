<?php

namespace Pronto\MobileBundle\Request;


use Pronto\MobileBundle\Exception\InvalidRequestException;
use Pronto\MobileBundle\Service\ValidatorService;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;
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
     * @var Request $current
     */
	public $current;

	/**
	 * ResultRequest constructor.
	 * @param RequestStack $requestStack
	 * @param ValidatorService $validatorService
	 * @throws InvalidRequestException
	 */
	public function __construct(RequestStack $requestStack, ValidatorService $validatorService)
	{
	    $this->current = $requestStack->getCurrentRequest();
		$this->parameterBag = $this->current->request;
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
        $requiredRules = ['type' => 'string', 'minLength' => 1];
        $rules = $this->rules();

        // Update the rules array, to add some rules by the required array
        foreach($this->required() as $requiredField) {
            $rules[$requiredField] = array_merge($requiredRules, $rules[$requiredField] ?? []);
        }

		$this->validatorService->validate($this->parameterBag, $this->required(), $rules);
	}

	/**
	 * @param string $key
	 * @param null $default
	 * @return mixed
	 */
	public function get(string $key, $default = null)
	{
        if(strpos($key, '.') === false) {
            return $this->parameterBag->get($key, $default);
        }

        [$key, $subKey] = explode('.', $key);
        $value = $this->parameterBag->get($key, $default);

		return $value[$subKey] ?? $default;
	}

	/**
	 * @return array
	 */
	public function all(): array
	{
		return $this->parameterBag->all();
	}
}
