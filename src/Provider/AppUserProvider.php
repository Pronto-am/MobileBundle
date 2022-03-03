<?php

namespace Pronto\MobileBundle\Provider;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Service\TokenInspectionService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class AppUserProvider implements UserProviderInterface
{
    protected EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function loadUserByUsername($email): UserInterface
    {
        $user = $this->entityManager->getRepository(AppUser::class)->findOneBy([
            'email'     => $email,
            'activated' => true,
        ]);

        if (!$user instanceof AppUser) {
            $message = sprintf('Unable to find an active AppUser identified by "%s".', $email);
            throw new UsernameNotFoundException($message, 404);
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
}
