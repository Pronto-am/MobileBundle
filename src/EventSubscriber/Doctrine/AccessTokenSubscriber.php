<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use DateTime;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppUser;
use Trikoder\Bundle\OAuth2Bundle\League\Entity\AccessToken;

class AccessTokenSubscriber implements EventSubscriber
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::postPersist];
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        if ($entity instanceof AccessToken) {
            $this->updateUser($entity);
        }
    }

    private function updateUser(AccessToken $accessToken): void
    {
        $userIdentifier = $accessToken->getUserIdentifier();
        $appUser = $this->entityManager->getRepository(AppUser::class)->find($userIdentifier);

        if (!$appUser instanceof AppUser) {
            return;
        }

        $appUser->setLastLogin(new DateTime());

        $this->entityManager->persist($appUser);
        $this->entityManager->flush();
    }
}
