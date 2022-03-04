<?php

namespace Pronto\MobileBundle\Provider;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AppUser;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class AppUserProvider implements UserProviderInterface, PasswordUpgraderInterface
{
    protected EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function loadUserByUsername(string $username): UserInterface
    {
        return $this->loadUserByIdentifier($username);
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        $user = $this->entityManager->getRepository(AppUser::class)->findOneBy([
            'email'     => $identifier,
            'activated' => true,
        ]);

        if (!$user instanceof AppUser) {
            $message = sprintf('Unable to find an active AppUser identified by "%s".', $identifier);
            throw new UserNotFoundException($message, 404);
        }

        return $user;
    }

    public function refreshUser(UserInterface $user)
    {
        $class = get_class($user);

        if (!$this->supportsClass($class)) {
            throw new UnsupportedUserException(
                sprintf(
                    'Instances of "%s" are not supported.',
                    $class
                )
            );
        }

        return $this->entityManager->getRepository(AppUser::class)->find($user->getId());
    }

    public function supportsClass($class): bool
    {
        return AppUser::class === $class || is_subclass_of($class, AppUser::class);
    }

    public function upgradePassword(UserInterface $user, string $newHashedPassword): void
    {
        $user->setPassword($newHashedPassword);
    }
}
