<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Service\FileUploader;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Utils\Str;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Translation\TranslatorInterface;

class CustomerListener
{

	/** @var FileUploader $fileUploader */
	private $fileUploader;

	/** @var string $directory */
	private $directory;

	/** @var ProntoMobile $prontoMobile */
	private $prontoMobile;

	/** @var TranslatorInterface $translator */
	private $translator;


	/**
	 * CustomerListener constructor.
	 * @param FileUploader $fileUploader
	 * @param ProntoMobile $prontoMobile
	 * @param TranslatorInterface $translator
	 */
	public function __construct(FileUploader $fileUploader, ProntoMobile $prontoMobile, TranslatorInterface $translator)
	{
		$this->prontoMobile = $prontoMobile;

		$uploadsFolder = $this->prontoMobile->getConfiguration('uploads_folder', 'uploads');

		$this->directory = Str::removeSlashes($uploadsFolder, true, true) . '/customers/images';

		$this->fileUploader = $fileUploader;
		$this->translator = $translator;
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
			try {
				$file = new File($this->directory . '/' . $fileName);
			} catch (FileNotFoundException $exception) {
				$file = null;
			}

			// Get the path name instead of the File object -> leads to serialization errors
			$entity->setLogo($file !== null ? $file->getFilename() : null);
		}
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
			$this->fileUploader->setTargetDirectory($this->directory);

			$fileName = $this->fileUploader->upload($file);

			$entity->setLogo($fileName);
		} elseif ($file instanceof File) {
			// If the entity is saved as file, save only the filename
			$entity->setLogo($file->getFilename());
		}
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