<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\OAuth;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application\ApplicationClient;
use Pronto\MobileBundle\Entity\AppUser;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Trikoder\Bundle\OAuth2Bundle\Event\UserResolveEvent;
use Trikoder\Bundle\OAuth2Bundle\Model\Client;

final class UserResolveListener
{
    private UserProviderInterface $userProvider;

    private UserPasswordHasherInterface $passwordHasher;

    private EntityManagerInterface $entityManager;

    public function __construct(
        UserProviderInterface       $userProvider,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface      $entityManager
    ) {
        $this->userProvider = $userProvider;
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
    }

    public function onUserResolve(UserResolveEvent $event): void
    {
        $user = $this->userProvider->loadUserByUsername($event->getUsername());
        if (!$user instanceof AppUser) {
            return;
        }

        // Check if the user belongs to the client's application
        if (!$this->userIsAllowedToUseClient($user, $event->getClient())) {
            return;
        }

        if (!$this->passwordHasher->isPasswordValid($user, $event->getPassword())) {
            return;
        }

        $event->setUser($user);
    }

    private function userIsAllowedToUseClient(AppUser $user, Client $client): bool
    {
        $repository = $this->entityManager->getRepository(ApplicationClient::class);
        $applicationClient = $repository->findOneBy([
            'client' => $client
        ]);

        if (!$applicationClient instanceof ApplicationClient) {
            return false;
        }

        if ($applicationClient->getApplication()->getId() !== $user->getApplication()->getId()) {
            return false;
        }

        return true;
    }
}
