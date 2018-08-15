<?php

namespace Pronto\MobileBundle\EventListener;


use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Exception;
use Kreait\Firebase\Factory;
use League\Flysystem\FileExistsException;
use League\Flysystem\FileNotFoundException;
use Pronto\MobileBundle\Service\PushNotification\GoogleServiceAccountLoader;
use Psr\Log\LoggerInterface;

class NotificationListener
{
	/** @var GoogleServiceAccountLoader $googleServiceAccountLoader */
	private $googleServiceAccountLoader;

	/** @var EntityManagerInterface $entityManager */
	private $entityManager;

	/** @var LoggerInterface $logger */
	private $logger;


	public function __construct(LoggerInterface $logger, GoogleServiceAccountLoader $googleServiceAccountLoader)
    {
    	$this->googleServiceAccountLoader = $googleServiceAccountLoader;
    	$this->logger = $logger;
    }


	/**
	 * Pre persist event
	 *
	 * @param LifecycleEventArgs $args
	 * @throws \Doctrine\ORM\NoResultException
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
    public function prePersist(LifecycleEventArgs $args): void
	{
    	$this->entityManager = $args->getEntityManager();

        $entity = $args->getEntity();

		$this->handleFile($entity);
    }


	/**
	 * Pre update event
	 *
	 * @param LifecycleEventArgs $args
	 * @throws \Doctrine\ORM\NoResultException
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
    public function preUpdate(LifecycleEventArgs $args): void
	{
		$this->entityManager = $args->getEntityManager();

		$entity = $args->getEntity();

        $this->handleFile($entity);
    }


	/**
	 * Upload or update the HTML click action file
	 *
	 * @param $entity
	 * @throws \Doctrine\ORM\NoResultException
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
    private function handleFile($entity): void
	{
		if(!$entity instanceof PushNotification || (int) $entity->getClickAction() !== 2) {
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

		foreach($clickActionHtml as $language => $content) {
			$path = 'notifications/' . $entity->getId() . '/' . $language . '/' . $entity->getId() . '.html';

			// Use the default language HTML when the provided language is empty
			if(empty($content)) {
				$content = $clickActionHtml[$application->getDefaultLanguage()];
			}

			$html = $config[Plugin::PUSH_NOTIFICATIONS_NOTIFICATION_TEMPLATE];
			$html = str_replace('{{ CONTENT }}', $content, $html);

			// Update if it exists, or create a new file
			if(!$filesystem->has($path)) {
				try {
					$filesystem->write($path, $html);
				} catch(FileExistsException $exception) {
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