<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\Customer;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostRemoveEventArgs;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Service\FileManager;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: Customer::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: Customer::class)]
#[AsEntityListener(event: Events::postRemove, method: 'postRemove', entity: Customer::class)]
class UpdateLogo
{
    public function __construct(
        private readonly FileManager $fileManager,
    ) {
    }

    public function prePersist(Customer $customer, PrePersistEventArgs $args): void
    {
        $this->uploadFile($customer);
    }

    public function preUpdate(Customer $customer, PreUpdateEventArgs $args): void
    {
        $this->uploadFile($customer);
    }

    public function postRemove(Customer $customer, PostRemoveEventArgs $args): void
    {
        $this->removeFile($customer);
    }

    private function uploadFile(Customer $customer): void
    {
        $file = $customer->getLogo();

        // only upload new files
        if ($file instanceof UploadedFile) {
            $fileName = $this->fileManager->upload(FileManager::IMAGES_DIRECTORY, $file);

            $customer->setLogo($fileName);
        } elseif ($file instanceof File) {
            // If the entity is saved as file, save only the filename
            $customer->setLogo($file->getFilename());
        }
    }

    private function removeFile($entity): void
    {
        if (!$entity instanceof Customer) {
            return;
        }

        $this->fileManager->remove(FileManager::IMAGES_DIRECTORY . '/' . $entity->getLogo());
    }
}
