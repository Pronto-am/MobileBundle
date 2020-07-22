<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Service\FileManager;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Translation\TranslatorInterface;

class CustomerSubscriber implements EventSubscriber
{
	/**
	 * @var FileManager $fileManager
	 */
	private $fileManager;

	/**
	 * @var ProntoMobile $prontoMobile
	 */
	private $prontoMobile;

	/**
	 * @var TranslatorInterface $translator
	 */
	private $translator;

    /**
     * CustomerSubscriber constructor.
     * @param FileManager $fileManager
     * @param ContainerInterface $container
     * @param TranslatorInterface $translator
     */
	public function __construct(FileManager $fileManager, ContainerInterface $container, TranslatorInterface $translator)
	{
		$this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
		$this->fileManager = $fileManager;
		$this->translator = $translator;
	}

	/**
	 * Returns an array of events this subscriber wants to listen to.
	 *
	 * @return string[]
	 */
	public function getSubscribedEvents(): array
	{
		return [Events::prePersist, Events::postPersist, Events::preUpdate, Events::postLoad, Events::postRemove];
	}

	/**
	 * Pre persist event
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function prePersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->uploadFile($entity);
	}

	/**
	 * Pre update event
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function preUpdate(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->uploadFile($entity);
	}

	/**
	 * Handle the post persist event of a customer object
	 *
	 * @param LifecycleEventArgs $args
	 * @throws \Doctrine\ORM\ORMException
	 */
	public function postPersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		if (!$entity instanceof Customer) {
			return;
		}

		// Initialize a new account
		$this->initializeAccount($entity, $args->getEntityManager());
	}

	/**
	 * Post load event, to use the file object inside Twig templates
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function postLoad(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		if (!$entity instanceof Customer) {
			return;
		}

		if ($fileName = $entity->getLogo()) {
			// Check if the logo exists
			$file = $this->fileManager->get(FileManager::IMAGES_DIRECTORY . '/' . $fileName);

			// Get the path name instead of the File object -> leads to serialization errors
			$entity->setLogo($file !== null ? $file->getFilename() : null);
		}
	}

	/**
	 * Pre update event
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function postRemove(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->removeFile($entity);
	}

	/**
	 * Upload the file
	 *
	 * @param $entity
	 */
	private function uploadFile($entity): void
	{
		if (!$entity instanceof Customer) {
			return;
		}

		$file = $entity->getLogo();

		// only upload new files
		if ($file instanceof UploadedFile) {
			$fileName = $this->fileManager->upload(FileManager::IMAGES_DIRECTORY, $file);

			$entity->setLogo($fileName);
		} elseif ($file instanceof File) {
			// If the entity is saved as file, save only the filename
			$entity->setLogo($file->getFilename());
		}
	}

	/**
	 * @param $entity
	 */
	private function removeFile($entity): void
	{
		if (!$entity instanceof Customer) {
			return;
		}

		$this->fileManager->remove(FileManager::IMAGES_DIRECTORY . '/' . $entity->getLogo());
	}

	/**
	 * @param Customer $entity
	 * @param EntityManager $entityManager
	 * @throws \Doctrine\ORM\ORMException
	 */
	private function initializeAccount(Customer $entity, EntityManager $entityManager): void
	{
		// Add the first application and version
		$app = new Application();
		$app->setName($this->translator->trans('application.first'));
		$app->setColor('00f4a7');
		$app->setDefaultLanguage('nl');
		$app->setAvailableLanguages([
			[
				'code'       => 'nl',
				'name'       => 'Dutch',
				'nativeName' => 'Nederlands, Vlaams'
			]
		]);

		$app->setCustomer($entity);

		$domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

		$app->setRedirectUris(['https://' . $domain]);
		$app->setAllowedGrantTypes(['refresh_token', 'password', 'token', 'authorization_code', 'client_credentials']);

		$entityManager->persist($app);
		$entityManager->flush();
	}
}
