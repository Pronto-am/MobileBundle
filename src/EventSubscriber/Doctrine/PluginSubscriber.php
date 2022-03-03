<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\PluginInitializer;

class PluginSubscriber implements EventSubscriber
{
    private PluginInitializer $initializer;

    private EntityManagerInterface $entityManager;

    public function __construct(PluginInitializer $initializer, EntityManagerInterface $entityManager)
    {
        $this->initializer = $initializer;
        $this->entityManager = $entityManager;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::postPersist];
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        if (!$entity instanceof Plugin) {
            return;
        }

        $this->initializeFirstVersion($entity);
    }

    private function initializeFirstVersion(Plugin $plugin): void
    {
        $applications = $this->entityManager->getRepository(Application::class)->findAll();

        foreach ($applications as $application) {
            $this->initializer->initialize($application, $plugin);
        }
    }
}
