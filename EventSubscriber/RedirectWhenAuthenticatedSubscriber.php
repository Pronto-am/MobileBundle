<?php

namespace Pronto\MobileBundle\EventSubscriber;


use Exception;
use Pronto\MobileBundle\Exceptions\UserRedirectException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;

class RedirectWhenAuthenticatedSubscriber implements EventSubscriberInterface
{
	/** @var AuthorizationCheckerInterface $authorizationChecker */
	private $authorizationChecker;

	/** @var UrlGeneratorInterface $router */
	private $router;


	/**
	 * RedirectWhenAuthenticatedSubscriber constructor.
	 * @param AuthorizationCheckerInterface $authorizationChecker
	 * @param UrlGeneratorInterface $router
	 */
	public function __construct(AuthorizationCheckerInterface $authorizationChecker, UrlGeneratorInterface $router)
	{
		$this->authorizationChecker = $authorizationChecker;
		$this->router = $router;
	}


	/**
	 * @param FilterControllerEvent $event
	 * @throws UserRedirectException
	 */
	public function onKernelController(FilterControllerEvent $event): void
	{
		try {
			if (HttpKernelInterface::MASTER_REQUEST !== $event->getRequestType() || !$this->authorizationChecker->isGranted('ROLE_USER')) {
				return;
			}
		} catch (AuthenticationCredentialsNotFoundException $exception) {
			return;
		}

		try {
			[$controller] = $event->getController();
		} catch(Exception $exception) {
			return;
		}

		// Redirect the user to the admin panel when already authenticated
		if ($controller instanceof RedirectWhenAuthenticatedInterface) {
			throw new UserRedirectException('The user is already authenticated');
		}
	}


	/**
	 * If user is logged in but has loaded one of the specified
	 * FOSUserBundle controllers
	 *
	 * @param GetResponseForExceptionEvent $event
	 */
	public function onKernelException(GetResponseForExceptionEvent $event): void
	{
		$exception = $event->getException();

		if (!$exception instanceof UserRedirectException) {
			return;
		}

		$url = $this->router->generate('pronto_mobile_homepage');
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