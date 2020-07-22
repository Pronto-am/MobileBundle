<?php

namespace Pronto\MobileBundle\EventSubscriber;


use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Exceptions\InvalidApplicationSelectionException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidateApplicationSelectionSubscriber implements EventSubscriberInterface
{
	/**
     * @var UrlGeneratorInterface $router
     */
	private $router;

	/**
     * @var EntityManagerInterface $entityManager
     */
	private $entityManager;

	/**
     * @var ProntoMobile $prontoMobile
     */
	private $prontoMobile;

    /**
     * ValidateApplicationSelectionSubscriber constructor.
     * @param UrlGeneratorInterface $router
     * @param ContainerInterface $container
     * @param EntityManagerInterface $entityManager
     */
	public function __construct(UrlGeneratorInterface $router, ContainerInterface $container, EntityManagerInterface $entityManager)
	{
		$this->router = $router;
		$this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
		$this->entityManager = $entityManager;
	}

	/**
	 * Check whether the controller is an instance of the required interface
	 *
	 * @param FilterControllerEvent $event
	 * @throws InvalidApplicationSelectionException
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
		$id = $session !== null ? $session->get(Version::SESSION_IDENTIFIER) : null;

		// Get the application version from the repository
		$applicationVersion = $id !== null ? $this->entityManager->getRepository(Version::class)->find($id) : null;

		// Add the version to the ProntoMobile service
		if ($applicationVersion !== null) {
			$this->prontoMobile->setApplicationVersion($applicationVersion);
			return;
		}

		if ($controller instanceof ValidateApplicationSelectionInterface) {
			throw new InvalidApplicationSelectionException('No application version set in the session');
		}
	}


	/**
	 * Catch the InvalidApplicationSelectionException to redirect users to the select view
	 *
	 * @param GetResponseForExceptionEvent $event
	 * @throws \InvalidArgumentException
	 */
	public function onKernelException(GetResponseForExceptionEvent $event): void
	{
		$exception = $event->getException();

		if (!$exception instanceof InvalidApplicationSelectionException) {
            return;
        }

		$url = $this->router->generate('pronto_mobile_select_application');
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
