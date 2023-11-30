<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine;

use DateTime;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Events;
use League\Bundle\OAuth2ServerBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\AppUser;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: AccessToken::class)]
class AccessTokenSubscriber
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    public function postPersist(AccessToken $accessToken, PostPersistEventArgs $args): void
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
