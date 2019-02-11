<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Service\FileManager;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Translation\TranslatorInterface;

class AppVersionSubscriber implements EventSubscriber
{
	/**
	 * @var FileManager $fileManager
	 */
	private $fileManager;

	/**
	 * @var string $directory
	 */
	private $directory;

	/**
	 * CustomerSubscriber constructor.
	 * @param FileManager $fileManager
	 * @param ProntoMobile $prontoMobile
	 * @param TranslatorInterface $translator
	 */
	public function __construct(FileManager $fileManager, ProntoMobile $prontoMobile, TranslatorInterface $translator)
	{
		$this->fileManager = $fileManager;
		$this->directory = '/customers/app_versions';
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
			$fileName = $this->fileManager->upload($this->directory, $file);

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

		$this->fileManager->remove($this->directory . '/' . $entity->getFileName());
	}
}