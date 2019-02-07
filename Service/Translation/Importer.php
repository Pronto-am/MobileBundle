<?php

namespace Pronto\MobileBundle\Service\Translation;


use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\DTO\Translation\UploadDTO;
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
	 * @var array $availableLanguages
	 */
	private $availableLanguages;

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
		$this->availableLanguages = array_reduce($prontoMobile->getApplication()->getAvailableLanguages(), function ($result, $language) {
			$result[] = $language['code'];

			return $result;
		}, []);

		$this->translationKeyRepository = $this->entityManager->getRepository(TranslationKey::class);
		$this->translationRepository = $this->entityManager->getRepository(Translation::class);
	}

	/**
	 * @param File $file
	 * @param UploadDTO $data
	 * @return bool
	 */
	public function import(File $file, UploadDTO $data): bool
	{
		$contents = file_get_contents($file->getRealPath());

		try {
			if ($this->isXml($contents)) {
				$this->fromXml($contents, $data->language, $data->type, $data->android, $data->ios);
			} else if ($this->isJson($contents)) {
				$this->fromJson($contents);
			} else {
				// Try to parse the file as a .strings file
				$this->fromPlainText($file, $data->language, $data->type, $data->android, $data->ios);
			}
		} catch (Exception $exception) {
			return false;
		}

		return true;
	}

	/**
	 * @param string $contents
	 * @param string $language
	 * @param string $type
	 * @param bool $android
	 * @param bool $ios
	 */
	private function fromXml(string $contents, string $language, string $type = 'app', bool $android = true, bool $ios = true): void
	{
		$parser = xml_parser_create();
		xml_parse_into_struct($parser, $contents, $values, $index);
		xml_parser_free($parser);

		foreach ($values as $translation) {
			if ($translation['type'] !== 'complete') {
				continue;
			}

			$translationKey = $this->saveTranslationKey($translation['attributes']['NAME'], $type, $android, $ios);
			$this->entityManager->flush();

			$this->saveTranslation($translationKey, $language, $translation['value']);

			$this->entityManager->flush();
		}
	}

	/**
	 * @param File $file
	 * @param string $language
	 * @param string $type
	 * @param bool $android
	 * @param bool $ios
	 */
	private function fromPlainText(File $file, string $language, string $type = 'app', bool $android = true, bool $ios = true): void
	{
		$handle = $file->openFile();

		if ($handle) {

			// Loop through the lines of the file
			while (($line = $handle->fgets()) !== false) {
				// The line must match: "<string>" = "<string>";
				preg_match('/(["])([a-zA-Z.-]+)(["]\s+[=]+\s+["])(.*)(["][;]?)/', $line, $matches);

				// With above regex, a valid key value pair exists of five keys
				if (count($matches) === 6) {
					$translationKey = $this->saveTranslationKey($matches[2], $type, $android, $ios);
					$this->entityManager->flush();

					$this->saveTranslation($translationKey, $language, $matches[4]);
				}

				// Stop at the end of the file
				if ($handle->eof()) {
					break;
				}
			}
		}
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

		foreach ($translations as $key) {
			$translationKey = $this->saveTranslationKey($key['identifier'], $key['type'], $key['android'] ?? true, $key['ios'] ?? true);
			$this->entityManager->flush();

			foreach ($this->availableLanguages as $language) {
				$translated = $this->filterTranslationsByLanguage($key['translations'], $language);

				$this->saveTranslation($translationKey, $translated['language'], $translated['text']);
			}

			$this->entityManager->flush();
		}
	}

	/**
	 * @param string $identifier
	 * @param string $type
	 * @param bool $android
	 * @param bool $ios
	 * @return TranslationKey
	 */
	private function saveTranslationKey(string $identifier, string $type, bool $android = true, bool $ios = true): TranslationKey
	{
		$translationKey = $this->translationKeyRepository->findOneBy([
				'identifier'  => $identifier,
				'application' => $this->application
			]) ?? new TranslationKey();

		$translationKey->setIdentifier($identifier);
		$translationKey->setType($type);
		$translationKey->setAndroid($android);
		$translationKey->setIos($ios ?? true);
		$translationKey->setApplication($this->application);

		$this->entityManager->persist($translationKey);

		// Initialize translations when the key is new
		if ($translationKey->getId() === null) {
			foreach($this->availableLanguages as $language) {
				$this->saveTranslation($translationKey, $language);
			}
		}

		return $translationKey;
	}

	/**
	 * @param TranslationKey $key
	 * @param string $language
	 * @param null|string $text
	 * @return Translation
	 */
	private function saveTranslation(TranslationKey $key, string $language, string $text = null): Translation
	{
		$translation = $this->translationRepository->findOneBy([
				'translationKey' => $key,
				'language'       => $language
			]) ?? new Translation();

		$translation->setTranslationKey($key);
		$translation->setText($text);
		$translation->setLanguage($language);

		$this->entityManager->persist($translation);

		return $translation;
	}

	/**
	 * @param array $translations
	 * @param string $language
	 * @return array
	 */
	private function filterTranslationsByLanguage(array $translations, string $language): array
	{
		$translated = array_filter($translations, function ($translation) use ($language) {
			return $translation['language'] === $language;
		});

		if (empty($translated)) {
			$translated = [
				'language' => $language,
				'text'     => null
			];
		} else {
			$translated = $translated[0];
		}

		return $translated;
	}

	/**
	 * @param string $string
	 * @return bool
	 */
	private function isJson(string $string): bool
	{
		json_decode($string);

		return json_last_error() === JSON_ERROR_NONE;
	}

	/**
	 * @param string $string
	 * @return bool
	 */
	private function isXml(string $string): bool
	{
		try {
			simplexml_load_string($string);

			return true;
		} catch (Exception $exception) {
			return false;
		}
	}
}