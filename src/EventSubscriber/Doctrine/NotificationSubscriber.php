<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use Doctrine\Common\EventSubscriber;
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

class NotificationSubscriber implements EventSubscriber
{
    public function __construct(
        readonly LoggerInterface $logger,
        readonly EntityManagerInterface $entityManager,
        readonly GoogleServiceAccountLoader $googleServiceAccountLoader
    ) {
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function prePersist(PrePersistEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof PushNotification) {
            return;
        }

        $this->handleFile($entity);
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof PushNotification) {
            return;
        }

        $this->handleFile($entity);
    }

    /**
     * @throws NonUniqueResultException
     * @throws NoResultException
     */
    private function handleFile(PushNotification $entity): void
    {
        // The entity must be a push notification with HTML webview
        if ($entity->getClickAction() !== 2) {
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
        $application = $entity->getApplication();

        /** @var PluginRepository $repository */
        $repository = $this->entityManager->getRepository(ApplicationPlugin::class);

        /** @var ApplicationPlugin $plugin */
        $plugin = $repository->findOneByApplicationAndIdentifier(
            $application,
            Plugin::PUSH_NOTIFICATIONS
        );

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

            $bucket->upload($html, [
                'name' => $path,
            ]);
        }
    }
}
