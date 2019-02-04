<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Entity\Application;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class ApplicationRequest
 * @package Pronto\MobileBundle\Request
 */
class ApplicationRequest extends Request
{
	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $name;


	/**
	 * @var string
	 */
	public $label;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $color;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $androidBundleIdentifier;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $iosBundleIdentifier;


	/**
	 * @var string
	 */
	public $clientId;


	/**
	 * @var string
	 */
	public $clientSecret;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $defaultLanguage;


	/**
	 * @Assert\NotBlank()
	 * @var string
	 */
	public $availableLanguages;


	/**
	 * UserRequest constructor.
	 */
	public function __construct()
	{
		$this->model = Application::class;
	}


	/**
	 * @param Application|null $entity
	 * @return Application
	 */
	public function toEntity($entity = null): Application
	{
		$entity = $this->toEntityByProperties($this, [
			'name',
			'label',
			'color',
			'androidBundleIdentifier',
			'iosBundleIdentifier',
			'availableLanguages'
		], $entity);

		$entity->setDefaultLanguage($this->defaultLanguage->code);

		return $entity;
	}


	/**
	 * @param Application|null $entity
	 * @return ApplicationRequest
	 */
	public static function fromEntity($entity = null): RequestInterface
	{
		$request = new self();

		if ($entity !== null) {
			$request->name = $entity->getName();
			$request->label = $entity->getLabel();
			$request->color = $entity->getColor();
			$request->androidBundleIdentifier = $entity->getAndroidBundleIdentifier();
			$request->iosBundleIdentifier = $entity->getIosBundleIdentifier();
			$request->clientId = $entity->getId() . '_' . $entity->getRandomId();
			$request->clientSecret = $entity->getSecret();
			$request->defaultLanguage = $entity->getDefaultLanguage();
			$request->availableLanguages = $entity->getAvailableLanguages();
		}

		return $request;
	}
}