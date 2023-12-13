<?php

namespace Pronto\MobileBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application\Version;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class JsonTranslator
{
    private ?Request $request;
    private ?Version $applicationVersion;

    public function __construct(
        RequestStack $requestStack,
        EntityManagerInterface $entityManager
    ) {
        $this->request = $requestStack->getCurrentRequest();

        if ($this->request !== null) {
            $id = $this->request->getSession()->get(Version::SESSION_IDENTIFIER);

            if ($id !== null) {
                $version = $entityManager->getRepository(Version::class)->find($id);
                $this->applicationVersion = $version;
            }
        }
    }

    public function getLanguage(array $json)
    {
        $language = $this->request->getLocale();

        // Return the requested language if set
        if (isset($json[$language])) {
            return $language;
        }

        // Else, return the application's default language
        if (isset($json[$this->applicationVersion?->getApplication()->getDefaultLanguage()])) {
            return $this->applicationVersion->getApplication()->getDefaultLanguage();
        }
    }

    public function getTranslation($json, $language = null)
    {
        // Stop if it's not an array of translations
        if (empty($json)) {
            return '';
        }

        if ($language === null) {
            $language = $this->request->getLocale();
        }

        // Return the requested language if set
        if (!empty($json[$language])) {
            return $json[$language];
        }

        // Get the applications' default language
        $defaultLanguage = $this->applicationVersion?->getApplication()->getDefaultLanguage();

        // Else, return the application's default language
        if (isset($json[$defaultLanguage]) && !empty($json[$defaultLanguage])) {
            return $json[$defaultLanguage];
        }

        // If both don't exist, return the first existing translation
        return array_values($json)[0];
    }
}
