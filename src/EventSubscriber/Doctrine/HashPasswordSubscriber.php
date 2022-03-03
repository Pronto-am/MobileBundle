<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class HashPasswordSubscriber implements EventSubscriber
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::prePersist, Events::preUpdate];
    }

    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        // Only instances of app users and regular users need to be checked
        if (!$entity instanceof User && !$entity instanceof AppUser) {
            return;
        }

        $this->encodePassword($entity);
    }

    private function encodePassword($user): void
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

    public function preUpdate(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        // Only instances of app users and regular users need to be checked
        if (!$entity instanceof User && !$entity instanceof AppUser) {
            return;
        }

        $this->encodePassword($entity);

        // To tell EventListener that the entity has been updated
        $em = $args->getEntityManager();
        $meta = $em->getClassMetadata(get_class($entity));
        $em->getUnitOfWork()->recomputeSingleEntityChangeSet($meta, $entity);
    }
}
