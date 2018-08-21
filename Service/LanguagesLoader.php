<?php

namespace Pronto\MobileBundle\Service;


use Exception;
use Symfony\Component\HttpKernel\Config\FileLocator;

class LanguagesLoader
{

	/** @var array $languages */
	private $languages;


	/**
	 * FontAwesomeLoader constructor.
	 * @param FileLocator $fileLocator
	 */
	public function __construct(FileLocator $fileLocator)
	{
		try {
			$json = file_get_contents($fileLocator->locate('@ProntoMobileBundle/languages.json'));

			$this->languages = json_decode($json);
		} catch (Exception $exception) {
			$this->languages = [];
		}
	}


	/**
	 * Get an array of languages
	 *
	 * @return array
	 */
	public function getArray(): array
	{
		return $this->languages;
	}


	/**
	 * Get the language by code
	 *
	 * @param $code
	 * @return mixed|null
	 */
	public function getByCode($code)
	{
		foreach ($this->languages as $language) {
			if ($language->code === strtolower($code)) {
				return $language;
			}
		}

		return null;
	}
}