<?php

namespace Pronto\MobileBundle\EventSubscriber;


use Exception;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Exceptions\InactivePluginException;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ValidatePluginStateSubscriber implements EventSubscriberInterface
{
	/**
     * @var UrlGeneratorInterface
     */
	private $router;

	/**
     * @var ProntoMobile $prontoMobile
     */
	private $prontoMobile;

    /**
     * ValidatePluginStateSubscriber constructor.
     * @param UrlGeneratorInterface $router
     * @param ContainerInterface $container
     */
	public function __construct(UrlGeneratorInterface $router, ContainerInterface $container)
	{
		$this->router = $router;
		$this->prontoMobile = $container->get('pronto_mobile.global.app');
	}

	/**
	 * @param FilterControllerEvent $event
	 * @throws InactivePluginException
	 */
	public function onKernelController(FilterControllerEvent $event): void
	{
		try {
			[$controller] = $event->getController();
		} catch (Exception $exception) {
			return;
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


	/**
	 * If user requested a plugin specific page, but the plugin isn't active, redirect back
	 * FOSUserBundle controllers
	 *
	 * @param GetResponseForExceptionEvent $event
	 */
	public function onKernelException(GetResponseForExceptionEvent $event): void
	{
		$exception = $event->getException();

		if (!$exception instanceof InactivePluginException) {
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
