<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Service\PushNotification;

use Exception;
use Pronto\MobileBundle\Entity\PushNotification;

class FirebaseStorage
{
    /**
     * @var GoogleServiceAccountLoader
     */
    private $googleServiceAccountLoader;

    public function __construct(GoogleServiceAccountLoader $googleServiceAccountLoader)
    {
        $this->googleServiceAccountLoader = $googleServiceAccountLoader;
    }

    public function generateUrlForPushNotification(PushNotification $pushNotification, string $language)
    {
        $defaultLanguage = $pushNotification->getApplication()->getDefaultLanguage();

        $identifier = $pushNotification->getId();
        $clickActionHtml = $pushNotification->getClickActionHtml();

        try {
            $projectId = $this->googleServiceAccountLoader->fromFile()->getProjectId();
        } catch (Exception $exception) {
            $projectId = 'pronto-staging';
        }

        $storageUrl = 'https://firebasestorage.googleapis.com/v0/b/' . $projectId . '.appspot.com/o/notifications%2F' . $identifier . '%2F';
        $storageUrl .= !empty($clickActionHtml[$language]) ? $language : $defaultLanguage;
        $storageUrl .= '%2F' . $identifier . '.html?alt=media';

        return $storageUrl;
    }
}
