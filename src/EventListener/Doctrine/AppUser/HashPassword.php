<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\AppUser;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppUser;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: AppUser::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: AppUser::class)]
class HashPassword
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
    }

    public function prePersist(AppUser $user, PrePersistEventArgs $args): void
    {
        $this->encodePassword($user);
    }

    public function preUpdate(AppUser $user, PreUpdateEventArgs $args): void
    {
        $this->encodePassword($user);

        // To tell EventListener that the entity has been updated
        $meta = $this->entityManager->getClassMetadata(get_class($user));
        $this->entityManager->getUnitOfWork()->recomputeSingleEntityChangeSet($meta, $user);
    }

    private function encodePassword(AppUser $user): void
    {
        if (!$user->getPlainPassword()) {
            return;
        }

        $encoded = $this->passwordHasher->hashPassword(
            $user,
            $user->getPlainPassword()
        );

        $user->setPassword($encoded);
    }
}
