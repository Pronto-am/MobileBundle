<?php

namespace Pronto\MobileBundle\Middleware;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Exception\ApiException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
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
        $this->prontoMobile = $container->get('pronto_mobile.global.app');
        $this->entityManager = $entityManager;

        parent::__construct();
    }

    /**
     * @return void
     * @throws ApiException
     */
    public function handle(): void
    {
        if (!$this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw new ApiException((new ErrorResponse(ErrorResponse::NO_AUTHORIZATION_HEADER))->create());
        }

        /** @var AccessToken $accessToken */
        $accessToken = $this->entityManager->getRepository(AccessToken::class)->findOneBy([
            'token' => $this->tokenStorage->getToken()->getCredentials()
        ]);

        /** @var Application $application */
        $application = $accessToken->getClient();

        // Check if the application exists
        if ($application === null) {
            throw new ApiException((new ErrorResponse(ErrorResponse::INVALID_AUTHORIZATION_TOKEN))->create());
        }

        // Save the application for later use
        $this->prontoMobile->setApplication($application);
    }
}
