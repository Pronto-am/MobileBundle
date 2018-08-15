<?php

namespace Pronto\MobileBundle\Service;


use Pronto\MobileBundle\Entity\Application\Version;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class JsonTranslator
{
	/** @var Request $request */
	private $request;

	/** @var Version $applicationVersion */
	private $applicationVersion;


	/**
	 * JsonTranslator constructor.
	 * @param RequestStack $requestStack
	 * @param EntityManagerInterface $entityManager
	 */
	public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager)
	{
		$this->request = $requestStack->getCurrentRequest();

		if ($this->request !== null) {
			$id = $this->request->getSession()->get(Version::SESSION_IDENTIFIER);

			if($id !== null) {
				$this->applicationVersion = $entityManager->getRepository(Version::class)->find($id);
			}
		}
	}


	/**
	 * Get the language to use
	 *
	 * @param $json
	 * @return mixed
	 */
	public function getLanguage($json)
	{
		$language = $this->request->getLocale();

		// Return the requested language if set
		if (isset($json[$language])) {
			return $language;
		}

		// Else, return the application's default language
		if (isset($json[$this->applicationVersion->getApplication()->getDefaultLanguage()])) {
			return $this->applicationVersion->getApplication()->getDefaultLanguage();
		}
	}


	/**
	 * Get the translation of a json object
	 *
	 * @param $json
	 * @param null $language
	 * @return mixed
	 */
	public function getTranslation($json, $language = null)
	{
		// Stop if it's not an array of translations
		if(empty($json)) {
			return '';
		}

		if ($language === null) {
			$language = $this->request->getLocale();
		}

		// Return the requested language if set
		if (isset($json[$language]) && !empty($json[$language])) {
			return $json[$language];
		}

		// Get the applications' default language
		$defaultLanguage = $this->applicationVersion->getApplication()->getDefaultLanguage();

		// Else, return the application's default language
		if (isset($json[$defaultLanguage]) && !empty($json[$defaultLanguage])) {
			return $json[$defaultLanguage];
		}

		// If both don't exist, return the first existing translation
		return array_values($json)[0];
	}
}