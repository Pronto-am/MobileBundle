<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Service\FileManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class AppVersionSubscriber implements EventSubscriber
{
    private FileManager $fileManager;

    public function __construct(FileManager $fileManager)
    {
        $this->fileManager = $fileManager;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::prePersist, Events::preUpdate, Events::postRemove];
    }

    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    private function uploadFile($entity): void
    {
        if (!$entity instanceof AppVersion) {
            return;
        }

        $file = $entity->getFileName();

        // only upload new files
        if ($file instanceof UploadedFile) {
            $fileName = $this->fileManager->upload(FileManager::APP_VERSIONS_DIRECTORY, $file);

            $entity->setFileName($fileName);
        }
    }

    public function preUpdate(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    public function postRemove(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        $this->removeFile($entity);
    }

    private function removeFile($entity): void
    {
        if (!$entity instanceof AppVersion) {
            return;
        }

        $this->fileManager->remove(FileManager::APP_VERSIONS_DIRECTORY . '/' . $entity->getFileName());
    }
}
