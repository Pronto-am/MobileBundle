<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Exceptions\InvalidCustomerSelectionException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidateCustomerSelectionSubscriber implements EventSubscriberInterface
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
     * @throws InvalidCustomerSelectionException
     */
    public function onKernelController(ControllerEvent $event): void
    {
        if (is_array($event->getController())) {
            [$controller] = $event->getController();
        } else {
            $controller = $event->getController();
        }

        if (!$controller instanceof ValidateCustomerSelectionInterface) {
            return;
        }

        $customer = $this->prontoMobile->getCustomer();
        if ($customer instanceof Customer) {
            return;
        }

        // If the customer isn't set, throw an exception
        throw new InvalidCustomerSelectionException('No customer set in the session');
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if (!$exception instanceof InvalidCustomerSelectionException) {
            return;
        }

        $url = $this->router->generate('pronto_mobile_select_customer');
        $response = new RedirectResponse($url);

        $event->setResponse($response);
    }
}
