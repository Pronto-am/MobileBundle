<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Exceptions\InvalidApplicationSelectionException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidateApplicationSelectionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly UrlGeneratorInterface $router,
        private readonly EntityManagerInterface $entityManager,
        private readonly ProntoMobile $prontoMobile,
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
     * @throws InvalidApplicationSelectionException
     */
    public function onKernelController(ControllerEvent $event): void
    {
        if (is_array($event->getController())) {
            [$controller] = $event->getController();
        } else {
            $controller = $event->getController();
        }

        if (!$controller instanceof ValidateApplicationSelectionInterface) {
            return;
        }

        $session = $event->getRequest()->getSession();

        // Get the id from the session
        $id = $session?->get(Version::SESSION_IDENTIFIER);

        // Get the application version from the repository
        $applicationVersion = $id !== null ? $this->entityManager->getRepository(Version::class)->find($id) : null;

        // Add the version to the ProntoMobile service
        if ($applicationVersion !== null) {
            $this->prontoMobile->setApplicationVersion($applicationVersion);
            return;
        }

        throw new InvalidApplicationSelectionException('No application version set in the session');
    }

    /**
     * Catch the InvalidApplicationSelectionException to redirect users to the select view
     *
     * @throws InvalidArgumentException
     */
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        if (!$exception instanceof InvalidApplicationSelectionException) {
            return;
        }

        $url = $this->router->generate('pronto_mobile_select_application');
        $response = new RedirectResponse($url);

        $event->setResponse($response);
    }
}
