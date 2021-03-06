<?php

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Exception;
use Kreait\Firebase\Factory;
use League\Flysystem\FileExistsException;
use League\Flysystem\FileNotFoundException;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Service\PushNotification\GoogleServiceAccountLoader;
use Psr\Log\LoggerInterface;

class NotificationSubscriber implements EventSubscriber
{
	/**
	 * @var GoogleServiceAccountLoader $googleServiceAccountLoader
	 */
	private $googleServiceAccountLoader;

	/**
	 * @var EntityManagerInterface $entityManager
	 */
	private $entityManager;

	/**
	 * @var LoggerInterface $logger
	 */
	private $logger;


	/**
	 * NotificationSubscriber constructor.
	 * @param LoggerInterface $logger
	 * @param EntityManagerInterface $entityManager
	 * @param GoogleServiceAccountLoader $googleServiceAccountLoader
	 */
	public function __construct(LoggerInterface $logger, EntityManagerInterface $entityManager, GoogleServiceAccountLoader $googleServiceAccountLoader)
	{
		$this->googleServiceAccountLoader = $googleServiceAccountLoader;
		$this->entityManager = $entityManager;
		$this->logger = $logger;
	}

	/**
	 * Returns an array of events this subscriber wants to listen to.
	 *
	 * @return string[]
	 */
	public function getSubscribedEvents(): array
	{
		return [Events::prePersist, Events::preUpdate];
	}

	/**
	 * Pre persist event
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function prePersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->handleFile($entity);
	}

	/**
	 * Pre update event
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function preUpdate(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		$this->handleFile($entity);
	}

	/**
	 * Upload or update the HTML click action file
	 *
	 * @param $entity
	 */
	private function handleFile($entity): void
	{
		// The entity must be a push notification with HTML webview
		if (!$entity instanceof PushNotification || ($entity instanceof PushNotification && $entity->getClickAction() !== 2)) {
			return;
		}

		try {
			$serviceAccount = $this->googleServiceAccountLoader->fromFile();
		} catch (Exception $exception) {
			$this->logger->error('Google service account json file not found');
			return;
		}

		$factory = new Factory();

		$firebase = $factory->withServiceAccount($serviceAccount)->create();
		$filesystem = $firebase->getStorage()->getFilesystem();
		$application = $entity->getApplication();

		/** @var ApplicationPlugin $plugin */
		$plugin = $this->entityManager->getRepository(ApplicationPlugin::class)->findOneByApplicationAndIdentifier($application, Plugin::PUSH_NOTIFICATIONS);
		$config = $plugin->getConfig();

		$clickActionHtml = $entity->getClickActionHtml();

		foreach ($clickActionHtml as $language => $content) {
			$path = 'notifications/' . $entity->getId() . '/' . $language . '/' . $entity->getId() . '.html';

			// Use the default language HTML when the provided language is empty
			if (empty($content)) {
				$content = $clickActionHtml[$application->getDefaultLanguage()];
			}

			$html = $config[Plugin::PUSH_NOTIFICATIONS_NOTIFICATION_TEMPLATE];
			$html = str_replace('{{ CONTENT }}', $content, $html);

			// Update if it exists, or create a new file
			if (!$filesystem->has($path)) {
				try {
					$filesystem->write($path, $html);
				} catch (FileExistsException $exception) {
					// File already exists
				}
			} else {
				try {
					$filesystem->update($path, $html);
				} catch (FileNotFoundException $exception) {
					// File not found
				}
			}
		}
	}
}
