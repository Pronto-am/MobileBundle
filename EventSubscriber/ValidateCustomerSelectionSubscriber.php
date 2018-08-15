<?php

namespace Pronto\MobileBundle\EventSubscriber;


use Exception;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Exceptions\InvalidCustomerSelectionException;
use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidateCustomerSelectionSubscriber implements EventSubscriberInterface
{

	/** @var UrlGeneratorInterface */
	private $router;

	/** @var ProntoMobile $prontoMobile */
	private $prontoMobile;

	/** @var EntityManagerInterface */
	private $entityManager;


	/**
	 * ValidateCustomerSelectionSubscriber constructor.
	 * @param UrlGeneratorInterface $router
	 * @param ProntoMobile $prontoMobile
	 * @param EntityManagerInterface $entityManager
	 */
	public function __construct(UrlGeneratorInterface $router, ProntoMobile $prontoMobile, EntityManagerInterface $entityManager)
	{
		$this->router = $router;
		$this->prontoMobile = $prontoMobile;
		$this->entityManager = $entityManager;
	}


	/**
	 * Check whether the controller is an instance of the required interface
	 *
	 * @param FilterControllerEvent $event
	 * @throws InvalidCustomerSelectionException
	 */
	public function onKernelController(FilterControllerEvent $event): void
	{
		try {
			[$controller] = $event->getController();
		} catch(Exception $exception) {
			return;
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


	/**
	 * Catch the InvalidCustomerSelectionException to redirect users to the select view
	 *
	 * @param GetResponseForExceptionEvent $event
	 * @throws \InvalidArgumentException
	 */
	public function onKernelException(GetResponseForExceptionEvent $event): void
	{
		$exception = $event->getException();

		if (!$exception instanceof InvalidCustomerSelectionException) {
			return;
		}

		$url = $this->router->generate('pronto_mobile_select_customer');
		$response = new RedirectResponse($url);

		$event->setResponse($response);
	}


	/**
	 * Returns an array of event names this subscriber wants to listen to.
	 *
	 * The array keys are event names and the value can be:
	 *
	 *  * The method name to call (priority defaults to 0)
	 *  * An array composed of the method name to call and the priority
	 *  * An array of arrays composed of the method names to call and respective
	 *    priorities, or 0 if unset
	 *
	 * For instance:
	 *
	 *  * array('eventName' => 'methodName')
	 *  * array('eventName' => array('methodName', $priority))
	 *  * array('eventName' => array(array('methodName1', $priority), array('methodName2')))
	 *
	 * @return array The event names to listen to
	 */
	public static function getSubscribedEvents(): array
	{
		return [
			KernelEvents::CONTROLLER => 'onKernelController',
			KernelEvents::EXCEPTION  => 'onKernelException',
		];
	}
}