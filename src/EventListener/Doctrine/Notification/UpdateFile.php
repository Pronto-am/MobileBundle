<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\Notification;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Exception;
use Kreait\Firebase\Factory;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Repository\Application\PluginRepository;
use Pronto\MobileBundle\Service\PushNotification\GoogleServiceAccountLoader;
use Psr\Log\LoggerInterface;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: PushNotification::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: PushNotification::class)]
class UpdateFile
{
    public function __construct(
        private readonly LoggerInterface $logger,
        private readonly EntityManagerInterface $entityManager,
        private readonly GoogleServiceAccountLoader $googleServiceAccountLoader
    ) {
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function prePersist(PushNotification $pushNotification, PrePersistEventArgs $args): void
    {
        $this->handleFile($pushNotification);
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function preUpdate(PushNotification $pushNotification, PreUpdateEventArgs $args): void
    {
        $this->handleFile($pushNotification);
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    private function handleFile(PushNotification $pushNotification): void
    {
        // The entity must be a push notification with HTML webview
        if ($pushNotification->getClickAction() !== 2) {
            return;
        }

        try {
            $serviceAccount = $this->googleServiceAccountLoader->fromFile();
        } catch (Exception) {
            $this->logger->error('Google service account json file not found');
            return;
        }

        $factory = new Factory();

        $firebase = $factory->withServiceAccount($serviceAccount);
        $bucket = $firebase->createStorage()->getBucket();
        $application = $pushNotification->getApplication();

        /** @var PluginRepository $repository */
        $repository = $this->entityManager->getRepository(ApplicationPlugin::class);

        /** @var ApplicationPlugin $plugin */
        $plugin = $repository->findOneByApplicationAndIdentifier(
            $application,
            Plugin::PUSH_NOTIFICATIONS
        );

        $config = $plugin->getConfig();

        $clickActionHtml = $pushNotification->getClickActionHtml();

        foreach ($clickActionHtml as $language => $content) {
            $path = 'notifications/' . $pushNotification->getId() . '/' . $language . '/' . $pushNotification->getId() . '.html';

            // Use the default language HTML when the provided language is empty
            if (empty($content)) {
                $content = $clickActionHtml[$application->getDefaultLanguage()];
            }

            $html = $config[Plugin::PUSH_NOTIFICATIONS_NOTIFICATION_TEMPLATE];
            $html = str_replace('{{ CONTENT }}', $content, $html);

            $bucket->upload($html, [
                'name' => $path,
            ]);
        }
    }
}
