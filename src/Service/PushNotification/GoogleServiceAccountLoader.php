<?php

namespace Pronto\MobileBundle\Service\PushNotification;

use Kreait\Firebase\ServiceAccount;
use Symfony\Component\HttpKernel\Config\FileLocator;

class GoogleServiceAccountLoader
{
    private FileLocator $fileLocator;

    public function __construct(FileLocator $fileLocator)
    {
        $this->fileLocator = $fileLocator;
    }

    public function fromFile(): ServiceAccount
    {
        $file = $this->fileLocator->locate('../google-service-account.json');

        return ServiceAccount::fromJsonFile($file);
    }
}
