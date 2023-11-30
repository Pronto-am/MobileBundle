<?php

namespace Pronto\MobileBundle\EventListener\Doctrine\Application;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: Application::class)]
class UpdateOAuthClientConfiguration
{
    public function prePersist(Application $application, PrePersistEventArgs $args): void
    {
        $application->setRedirectUris([
            'https://pronto.am'
        ]);

        $application->setAllowedGrantTypes([
            'refresh_token', 'password', 'token', 'client_credentials'
        ]);
    }
}