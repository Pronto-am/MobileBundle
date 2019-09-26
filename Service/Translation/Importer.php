<?php

namespace Pronto\MobileBundle\Service\Translation;


use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\DTO\Translation\UploadDTO;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Importer
{
    public const FILE_TYPE_XML = 'xml';
    public const FILE_TYPE_JSON = 'json';
    public const FILE_TYPE_CSV = 'csv';
    public const FILE_TYPE_PLAIN_TEXT = 'plain_text';

    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * @var array $availableLanguages
     */
    private $availableLanguages;

    /**
     * @var ProntoMobile $prontoMobile
     */
    private $prontoMobile;

    /**
     * @var \Doctrine\Common\Persistence\ObjectRepository $translationKeyRepository
     */
    private $translationKeyRepository;

    /**
     * @var \Doctrine\Common\Persistence\ObjectRepository $translationRepository
     */
    private $translationRepository;

    /**
     * @var string|null $fileType
     */
    private $fileType;

    /**
     * Importer constructor.
     * @param EntityManagerInterface $entityManager
     * @param ContainerInterface $container
     */
    public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container)
    {
        $this->entityManager = $entityManager;
        $this->prontoMobile = $container->get('pronto_mobile.global.app');
        $this->availableLanguages = array_reduce($this->prontoMobile->getApplication()->getAvailableLanguages(), function ($result, $language) {
            $result[] = $language['code'];

            return $result;
        }, []);

        $this->translationKeyRepository = $this->entityManager->getRepository(TranslationKey::class);
        $this->translationRepository = $this->entityManager->getRepository(Translation::class);
    }

    /**
     * @param UploadedFile $file
     * @param UploadDTO $data
     * @return bool
     */
    public function import(UploadedFile $file, UploadDTO $data): bool
    {
        $contents = file_get_contents($file->getRealPath());

        try {
            if ($this->isXml($contents)) {
                $this->fileType = self::FILE_TYPE_XML;

                $this->fromXml($contents, $data->language, $data->type, $data->android, $data->ios);
            } else if ($this->isJson($contents)) {
                $this->fileType = self::FILE_TYPE_JSON;

                $this->fromJson($contents);
            } else if ($this->isCsv($file)) {
                $this->fileType = self::FILE_TYPE_CSV;

                $this->fromCsv($file);
            } else {
                // Try to parse the file as a .strings file
                $this->fileType = self::FILE_TYPE_PLAIN_TEXT;

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
     * @param UploadedFile $file
     * @param string $language
     * @param string $type
     * @param bool $android
     * @param bool $ios
     */
    private function fromPlainText(UploadedFile $file, string $language, string $type = 'app', bool $android = true, bool $ios = true): void
    {
        $handle = $file->openFile();

        if ($handle) {

            // Loop through the lines of the file
            while (($line = $handle->fgets()) !== false) {
                // The line must match: "<string>" = "<string>";
                preg_match('/(["])([a-zA-Z.-_]+)(["]\s+[=]+\s+["])(.*)(["][;]?)/', $line, $matches);

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
     * @param UploadedFile $file
     */
    private function fromCsv(UploadedFile $file): void
    {
        $first = true;
        $languages = [];

        if ($handle = $file->openFile()) {

            while (($data = $handle->fgetcsv(';')) !== false) {
                if ($first) {
                    // Validate the headers
                    if ($data !== $this->getCsvHeaders()) {
                        return;
                    }

                    for ($index = 5; $index < count($data); $index++) {
                        preg_match('/\(([a-zA-Z]+)\)/', $data[$index], $matches);

                        if ($matches[1]) {
                            $languages[$index] = strtolower($matches[1]);
                        }
                    }

                    $first = false;
                } else {
                    [$identifier, $type, $description, $android, $ios] = $data;

                    $translationKey = $this->saveTranslationKey($identifier, $type, (int) $android === 1, (int) $ios === 1, $description);

                    foreach ($languages as $index => $code) {
                        $this->saveTranslation($translationKey, $code, $data[$index]);
                    }

                    // Stop at the end of the file
                    if ($handle->eof()) {
                        break;
                    }
                }
            }

            $this->entityManager->flush();
        }
    }

    /**
     * @param string $identifier
     * @param string $type
     * @param bool $android
     * @param bool $ios
     * @param string $description
     * @return TranslationKey
     */
    private function saveTranslationKey(string $identifier, string $type, bool $android = true, bool $ios = true, string $description = null): TranslationKey
    {
        $application = $this->prontoMobile->getApplication();

        $translationKey = $this->translationKeyRepository->findOneBy([
                'identifier'  => $identifier,
                'application' => $application
            ]) ?? new TranslationKey();

        $translationKey->setIdentifier($identifier);
        $translationKey->setType($type);

        if($description !== null) {
            $translationKey->setDescription($description);
        }

        $translationKey->setAndroid($android);

        // Keep the old IOS setting when an existing key is overridden
        if ($this->fileType === self::FILE_TYPE_XML) {
            $ios = $translationKey->getId() !== null ? $translationKey->isIos() : $ios;
        }

        $translationKey->setIos($ios ?? true);
        $translationKey->setApplication($application);

        $this->entityManager->persist($translationKey);
        $this->entityManager->flush();

        // Initialize translations when the key is new
        if ($translationKey->getId() === null) {
            foreach ($this->availableLanguages as $language) {
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
        $xml = @simplexml_load_string($string);

        return $xml !== false;
    }

    /**
     * @param UploadedFile $file
     * @return bool
     */
    private function isCsv(UploadedFile $file): bool
    {
        return $file->getClientOriginalExtension() === 'csv';
    }

    /**
     * @return array
     */
    private function getCsvHeaders(): array
    {
        $availableLanguages = $this->prontoMobile->getApplication()->getAvailableLanguages();

        $headers = ['key', 'type', 'description', 'android', 'ios'];

        foreach ($availableLanguages as $language) {
            $headers[] = ucfirst($language['nativeName']) . ' (' . $language['code'] . ')';
        }

        return $headers;
    }
}
