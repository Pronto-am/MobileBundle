<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Exceptions\InactivePluginException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidatePluginStateSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly UrlGeneratorInterface $router,
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
     * @throws InactivePluginException
     */
    public function onKernelController(ControllerEvent $event): void
    {
        if (is_array($event->getController())) {
            [$controller] = $event->getController();
        } else {
            $controller = $event->getController();
        }

        if ($controller instanceof ValidatePluginStateInterface) {
            /** @var Application $application */
            $application = $this->prontoMobile->getApplication();

            [$plugin] = array_values(array_filter($application->getApplicationPlugins()->getValues(), function ($plugin) use ($controller) {
                /** @var ApplicationPlugin $plugin */
                return $plugin->getPlugin()->getIdentifier() === $controller->getPluginIdentifier();
            }));

            /** @var ApplicationPlugin $plugin */
            if (!$plugin->getActive()) {
                throw new InactivePluginException('This plugin isn\'t active');
            }
        }
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if (!$exception instanceof InactivePluginException) {
            return;
        }

        $url = $this->router->generate('pronto_mobile_homepage');
        $response = new RedirectResponse($url);

        $event->setResponse($response);
    }
}
