<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

use Pronto\MobileBundle\Exceptions\UserRedirectException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;

class RedirectWhenAuthenticatedSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly AuthorizationCheckerInterface $authorizationChecker,
        private readonly UrlGeneratorInterface $router
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
            KernelEvents::EXCEPTION  => 'onKernelException',
        ];
    }

    /**
     * @throws UserRedirectException
     */
    public function onKernelController(ControllerEvent $event): void
    {
        try {
            if (HttpKernelInterface::MAIN_REQUEST !== $event->getRequestType() ||
                !$this->authorizationChecker->isGranted('ROLE_USER')) {
                return;
            }
        } catch (AuthenticationCredentialsNotFoundException) {
            return;
        }

        if (is_array($event->getController())) {
            [$controller] = $event->getController();
        } else {
            $controller = $event->getController();
        }

        // Redirect the user to the admin panel when already authenticated
        if ($controller instanceof RedirectWhenAuthenticatedInterface) {
            throw new UserRedirectException('The user is already authenticated');
        }
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if (!$exception instanceof UserRedirectException) {
            return;
        }

        $url = $this->router->generate('pronto_mobile_homepage');
        $response = new RedirectResponse($url);

        $event->setResponse($response);
    }
}
