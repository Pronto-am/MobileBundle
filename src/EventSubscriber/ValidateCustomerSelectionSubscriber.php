<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use InvalidArgumentException;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Exceptions\InvalidCustomerSelectionException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidateCustomerSelectionSubscriber implements EventSubscriberInterface
{
    private UrlGeneratorInterface $router;

    private ProntoMobile $prontoMobile;

    private EntityManagerInterface $entityManager;

    public function __construct(UrlGeneratorInterface $router, ContainerInterface $container, EntityManagerInterface $entityManager)
    {
        $this->router = $router;
        $this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
        $this->entityManager = $entityManager;
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

        $session = $event->getRequest()->getSession();

        // Get the id from the session
        $id = $session !== null ? $session->get(Customer::SESSION_IDENTIFIER) : null;

        // Get the customer from the repository
        $customer = $id !== null ? $this->entityManager->getRepository(Customer::class)->find($id) : null;

        // Add the customer to the ProntoMobile service
        if ($customer !== null) {
            $this->prontoMobile->setCustomer($customer);
            return;
        }

        // If the customer isn't set, throw an exception
        if ($controller instanceof ValidateCustomerSelectionInterface) {
            throw new InvalidCustomerSelectionException('No customer set in the session');
        }
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
