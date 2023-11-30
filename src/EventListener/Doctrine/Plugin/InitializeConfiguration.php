<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\Plugin;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\PluginInitializer;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: Plugin::class)]
class InitializeConfiguration
{
    public function __construct(
        private readonly PluginInitializer $initializer,
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    public function postPersist(Plugin $plugin, PostPersistEventArgs $args): void
    {
        $applications = $this->entityManager->getRepository(Application::class)->findAll();

        foreach ($applications as $application) {
            $this->initializer->initialize($application, $plugin);
        }
    }
}
