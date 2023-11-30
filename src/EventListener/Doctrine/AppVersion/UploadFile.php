<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\AppVersion;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Service\FileManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: AppVersion::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: AppVersion::class)]
class UploadFile
{
    public function __construct(
        private readonly FileManager $fileManager
    ) {
    }

    public function prePersist(AppVersion $appVersion, PrePersistEventArgs $args): void
    {
        $this->uploadFile($appVersion);
    }

    public function preUpdate(AppVersion $appVersion, PreUpdateEventArgs $args): void
    {
        $this->uploadFile($appVersion);
    }

    private function uploadFile(AppVersion $entity): void
    {
        $file = $entity->getFileName();

        // only upload new files
        if ($file instanceof UploadedFile) {
            $fileName = $this->fileManager->upload(FileManager::APP_VERSIONS_DIRECTORY, $file);

            $entity->setFileName($fileName);
        }
    }
}
