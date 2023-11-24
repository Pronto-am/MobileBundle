<?php

namespace Pronto\MobileBundle\Service\PushNotification;

use InvalidArgumentException;
use Symfony\Component\HttpKernel\Config\FileLocator;

class GoogleServiceAccountLoader
{
    private FileLocator $fileLocator;

    public function __construct(FileLocator $fileLocator)
    {
        $this->fileLocator = $fileLocator;
    }

    public function fromFile(): array
    {
        $file = $this->fileLocator->locate('../google-service-account.json');
        $contents = json_decode(file_get_contents($file), true);

        if (!array_key_exists('client_email', $contents) || !array_key_exists('private_key', $contents)) {
            throw new InvalidArgumentException(
                'Service account credentials invalid'
            );
        }

        return $contents;
    }
}
