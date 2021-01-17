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
	/**
	 * @var FileManager $fileManager
	 */
	private $fileManager;

	/**
	 * CustomerSubscriber constructor.
	 * @param FileManager $fileManager
	 */
	public function __construct(FileManager $fileManager)
	{
		$this->fileManager = $fileManager;
	}

	/**
	 * Returns an array of events this subscriber wants to listen to.
	 *
	 * @return string[]
	 */
	public function getSubscribedEvents(): array
	{
		return [Events::prePersist, Events::preUpdate, Events::postRemove];
	}

	/**
	 * @param LifecycleEventArgs $args
	 */
	public function prePersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->uploadFile($entity);
	}

	/**
	 * @param LifecycleEventArgs $args
	 */
	public function preUpdate(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->uploadFile($entity);
	}

	/**
	 * @param LifecycleEventArgs $args
	 */
	public function postRemove(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->removeFile($entity);
	}

	/**
	 * @param $entity
	 */
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

	/**
	 * @param $entity
	 */
	private function removeFile($entity): void
	{
		if (!$entity instanceof AppVersion) {
			return;
		}

		$this->fileManager->remove(FileManager::APP_VERSIONS_DIRECTORY . '/' . $entity->getFileName());
	}
}
