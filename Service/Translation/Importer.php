<?php

namespace Pronto\MobileBundle\Service\Translation;


use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\HttpFoundation\File\File;

class Importer
{
	/**
	 * @var EntityManagerInterface $entityManager
	 */
	private $entityManager;

	/**
	 * @var Application $application
	 */
	private $application;

	/**
	 * @var \Doctrine\Common\Persistence\ObjectRepository $translationKeyRepository
	 */
	private $translationKeyRepository;

	/**
	 * @var \Doctrine\Common\Persistence\ObjectRepository $translationRepository
	 */
	private $translationRepository;

	/**
	 * Importer constructor.
	 * @param EntityManagerInterface $entityManager
	 * @param ProntoMobile $prontoMobile
	 */
	public function __construct(EntityManagerInterface $entityManager, ProntoMobile $prontoMobile)
	{
		$this->entityManager = $entityManager;
		$this->application = $prontoMobile->getApplication();

		$this->translationKeyRepository = $this->entityManager->getRepository(TranslationKey::class);
		$this->translationRepository = $this->entityManager->getRepository(Translation::class);
	}

	/**
	 * @param File $file
	 * @return bool
	 */
	public function import(File $file): boolean
	{
		$contents = file_get_contents($file->getRealPath());

		try {
			if ($file->getMimeType() === 'text/xml') {
				$this->fromXml($contents);
			} else {
				$this->fromJson($contents);
			}
		} catch(Exception $exception) {
			return false;
		}

		return true;
	}

	/**
	 * @param string $contents
	 */
	private function fromJson(string $contents): void
	{
		try {
			$translations = json_decode($contents, true);
		} catch (Exception $exception) {
			return;
		}

		$availableLanguages = array_reduce($this->application->getAvailableLanguages(), function ($result, $language) {
			$result[] = $language['code'];

			return $result;
		}, []);

		foreach ($translations as $key) {
			$translationKey = $this->saveTranslationKey($key);
			$this->entityManager->flush();

			foreach ($key['translations'] as $translated) {
				// The application needs to have this language enabled
				if (!in_array($translated['language'], $availableLanguages, true)) {
					continue;
				}

				$this->saveTranslation($translationKey, $translated);
			}

			$this->entityManager->flush();
		}
	}

	/**
	 * @param string $contents
	 */
	private function fromXml(string $contents): void
	{
		$availableLanguages = array_reduce($this->application->getAvailableLanguages(), function ($result, $language) {
			$result[] = $language['code'];

			return $result;
		}, []);

		$translations = simplexml_load_string($contents);
		$translations = json_decode(json_encode($translations), true);

		$translations = $translations['translationKey'];

		// Wrap it inside an array when it's one element
		if (isset($translations['identifier'], $translations['type'], $translations['translations'])) {
			$translations = [$translations];
		}

		foreach ($translations as $key) {
			$translationKey = $this->saveTranslationKey($key);
			$this->entityManager->flush();

			$translations = $key['translations']['translation'];

			// It's a single item, so go up one level
			if (isset($translations['language'], $translations['text'])) {
				$translations = $key['translations'];
			}

			foreach ($translations as $translated) {
				// The application needs to have this language enabled
				if (!in_array($translated['language'], $availableLanguages, true)) {
					continue;
				}

				$this->saveTranslation($translationKey, $translated);
			}

			$this->entityManager->flush();
		}
	}

	/**
	 * @param array $key
	 * @return TranslationKey
	 */
	private function saveTranslationKey(array $key): TranslationKey
	{
		$translationKey = $this->translationKeyRepository->findOneBy([
				'identifier'  => $key['identifier'],
				'application' => $this->application
			]) ?? new TranslationKey();

		$translationKey->setIdentifier($key['identifier']);
		$translationKey->setType($key['type']);
		$translationKey->setApplication($this->application);

		$this->entityManager->persist($translationKey);

		return $translationKey;
	}

	/**
	 * @param TranslationKey $key
	 * @param array $translated
	 * @return Translation
	 */
	private function saveTranslation(TranslationKey $key, array $translated): Translation
	{
		$translation = $this->translationRepository->findOneBy([
				'translationKey' => $key,
				'language'       => $translated['language']
			]) ?? new Translation();

		$translation->setTranslationKey($key);
		$translation->setText($translated['text']);
		$translation->setLanguage($translated['language']);

		$this->entityManager->persist($translation);

		return $translation;
	}
}