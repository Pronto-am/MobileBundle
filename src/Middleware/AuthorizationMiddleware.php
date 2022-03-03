<?php

namespace Pronto\MobileBundle\Middleware;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application\ApplicationClient;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationHeaderException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Trikoder\Bundle\OAuth2Bundle\Model\AccessToken;
use Trikoder\Bundle\OAuth2Bundle\Security\Authentication\Token\OAuth2Token;

class AuthorizationMiddleware extends Middleware
{
    private AuthorizationCheckerInterface $authorizationChecker;
    private TokenStorageInterface $tokenStorage;
    private EntityManagerInterface $entityManager;
    private ProntoMobile $prontoMobile;

    public function __construct(ContainerInterface $container, EntityManagerInterface $entityManager)
    {
        $this->authorizationChecker = $container->get('security.authorization_checker');
        $this->tokenStorage = $container->get('security.token_storage');
        $this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
        $this->entityManager = $entityManager;

        parent::__construct();
    }

    /**
     * @throws InvalidAuthorizationHeaderException
     * @throws InvalidAuthorizationTokenException
     */
    public function handle(): void
    {
        if (!$this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new InvalidAuthorizationHeaderException();
        }

        // The token must be an instance of the OAuth2 library token model
        $token = $this->tokenStorage->getToken();
        if (!$token instanceof OAuth2Token) {
            throw new InvalidAuthorizationTokenException();
        }

        $accessToken = $this->entityManager->getRepository(AccessToken::class)->findOneBy([
            'identifier' => $token->getCredentials()
        ]);

        if (!$accessToken instanceof AccessToken) {
            throw new InvalidAuthorizationTokenException();
        }

        $applicationClient = $this->entityManager->getRepository(ApplicationClient::class)->findOneBy([
            'client' => $accessToken->getClient(),
        ]);

        if (!$applicationClient instanceof ApplicationClient) {
            throw new InvalidAuthorizationTokenException();
        }

        $application = $applicationClient->getApplication();

        // Save the application for later use
        $this->prontoMobile->setApplication($application);
    }
}
