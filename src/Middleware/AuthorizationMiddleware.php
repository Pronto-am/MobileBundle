<?php

namespace Pronto\MobileBundle\Middleware;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationHeaderException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

/**
 * Class AuthorizationMiddleware
 * @package Pronto\MobileBundle\Middleware
 */
class AuthorizationMiddleware extends Middleware
{
    /**
     * @var AuthorizationCheckerInterface $authorizationChecker
     */
    private $authorizationChecker;

    /**
     * @var TokenStorageInterface $tokenStorage
     */
    private $tokenStorage;

    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * @var ProntoMobile $prontoMobile
     */
    private $prontoMobile;

    /**
     * AuthorizationMiddleware constructor.
     * @param ContainerInterface $container
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(ContainerInterface $container, EntityManagerInterface $entityManager)
    {
        $this->authorizationChecker = $container->get('security.authorization_checker');
        $this->tokenStorage = $container->get('security.token_storage');
        $this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
        $this->entityManager = $entityManager;

        parent::__construct();
    }

    /**
     * @return void
     * @throws InvalidAuthorizationHeaderException
     * @throws InvalidAuthorizationTokenException
     */
    public function handle(): void
    {
        if (! $this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new InvalidAuthorizationHeaderException();
        }

        /** @var AccessToken $accessToken */
        $accessToken = $this->entityManager->getRepository(AccessToken::class)->findOneBy([
            'token' => $this->tokenStorage->getToken()->getCredentials()
        ]);

        /** @var Application $application */
        $application = $accessToken->getClient();

        // Check if the application exists
        if ($application === null) {
            throw new InvalidAuthorizationTokenException();
        }

        // Save the application for later use
        $this->prontoMobile->setApplication($application);
    }
}
