<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Kernel\OAuth;

use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Service\TokenInspectionService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class ApplicationScopeSubscriber implements EventSubscriberInterface
{
    private TokenInspectionService $tokenInspectionService;

    public function __construct(TokenInspectionService $tokenInspectionService)
    {
        $this->tokenInspectionService = $tokenInspectionService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'checkApplicationAccess',
        ];
    }

    public function checkApplicationAccess(RequestEvent $event): void
    {
        try {
            $application = $this->tokenInspectionService->getApplication();
            $user = $this->tokenInspectionService->getUser();

            if ($user instanceof AppUser && $user->getApplication()->getId() !== $application->getId()) {
                throw new AccessDeniedException('The access token cannot access this application\'s data');
            }
        } catch (InvalidAuthorizationTokenException $exception) {
            // Let other subscribers handle invalid tokens
            // This subscriber purely checks if the user can access the application
            return;
        }
    }
}
