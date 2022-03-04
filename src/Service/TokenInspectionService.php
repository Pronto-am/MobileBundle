<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use League\Bundle\OAuth2ServerBundle\Entity\AccessToken;
use League\Bundle\OAuth2ServerBundle\Security\Authentication\Token\OAuth2Token;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationClient;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class TokenInspectionService
{
    private EntityManagerInterface $entityManager;

    private TokenStorageInterface $tokenStorage;

    private ?Application $application = null;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @throws InvalidAuthorizationTokenException
     */
    public function getUser(): ?UserInterface
    {
        $token = $this->tokenStorage->getToken();
        if (!$token instanceof OAuth2Token) {
            throw new InvalidAuthorizationTokenException('The token is not a valid OAuth token');
        }

        return $token->getUser();
    }

    /**
     * @throws InvalidAuthorizationTokenException
     */
    public function getApplication(): Application
    {
        if ($this->application instanceof Application) {
            return $this->application;
        }

        $token = $this->tokenStorage->getToken();
        if (!$token instanceof OAuth2Token) {
            throw new InvalidAuthorizationTokenException('The token is not a valid OAuth token');
        }

        // Get the access token and corresponding client
        $accessToken = $this->entityManager->getRepository(AccessToken::class)->findOneBy([
            'identifier' => $token->getCredentials()
        ]);

        if (!$accessToken instanceof AccessToken) {
            throw new InvalidAuthorizationTokenException('The access token could not be identified');
        }

        $applicationClient = $this->entityManager->getRepository(ApplicationClient::class)->findOneBy([
            'clientIdentifier' => $accessToken->getClient()->getIdentifier(),
        ]);

        if (!$applicationClient instanceof ApplicationClient) {
            throw new InvalidAuthorizationTokenException('The access token could not be linked to an application');
        }

        $this->application = $applicationClient->getApplication();
        return $this->application;
    }
}
