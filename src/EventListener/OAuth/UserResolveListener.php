<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\OAuth;

use Doctrine\ORM\EntityManagerInterface;
use League\Bundle\OAuth2ServerBundle\Event\UserResolveEvent;
use League\Bundle\OAuth2ServerBundle\Model\AbstractClient;
use Pronto\MobileBundle\Entity\Application\ApplicationClient;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Provider\AppUserProvider;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

#[AsEventListener(event: UserResolveEvent::class, method: 'onUserResolve')]
final class UserResolveListener
{
    private UserProviderInterface $userProvider;

    private UserPasswordHasherInterface $passwordHasher;

    private EntityManagerInterface $entityManager;

    public function __construct(
        AppUserProvider $userProvider,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
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

    private function userIsAllowedToUseClient(AppUser $user, AbstractClient $client): bool
    {
        $repository = $this->entityManager->getRepository(ApplicationClient::class);
        $applicationClient = $repository->findOneBy([
            'clientIdentifier' => $client->getIdentifier()
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
