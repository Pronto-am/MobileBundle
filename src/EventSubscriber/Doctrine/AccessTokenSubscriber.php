<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use DateTime;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\AppUser;

class AccessTokenSubscriber implements EventSubscriber
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * AccessTokenSubscriber constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return string[]
     */
    public function getSubscribedEvents(): array
    {
        return [Events::postPersist];
    }

    /**
     * Post persist event
     *
     * @param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        if ($entity instanceof AccessToken) {
            $this->updateUser($entity);
        }
    }

    /**
     * @param AccessToken $accessToken
     */
    private function updateUser(AccessToken $accessToken): void
    {
        /** @var AppUser $user */
        $user = $accessToken->getUser();

        if ($user !== null) {
            $user->setLastLogin(new DateTime());

            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }
    }
}
