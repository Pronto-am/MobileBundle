<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\AppVersion;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostRemoveEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Service\FileManager;

#[AsEntityListener(event: Events::postRemove, method: 'postRemove', entity: AppVersion::class)]
class RemoveUploadedFile
{
    public function __construct(
        private readonly FileManager $fileManager
    ) {
    }

    public function postRemove(AppVersion $appVersion, PostRemoveEventArgs $args): void
    {
        $this->fileManager->remove(
            fileName: FileManager::APP_VERSIONS_DIRECTORY . '/' . $appVersion->getFileName()
        );
    }
}
