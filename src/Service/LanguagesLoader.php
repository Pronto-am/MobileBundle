<?php

namespace Pronto\MobileBundle\Service;

use Exception;
use stdClass;
use Symfony\Component\HttpKernel\Config\FileLocator;

class LanguagesLoader
{
    private array $languages;

    public function __construct(FileLocator $fileLocator)
    {
        try {
            $json = file_get_contents($fileLocator->locate('@ProntoMobileBundle/Resources/languages.json'));

            $this->languages = json_decode($json);
        } catch (Exception $exception) {
            dump($exception);
            $this->languages = [];
        }
    }

    public function getArray(): array
    {
        return $this->languages;
    }

    public function getByCode(string $code): ?stdClass
    {
        foreach ($this->languages as $language) {
            if ($language->code === strtolower($code)) {
                return $language;
            }
        }

        return null;
    }
}
