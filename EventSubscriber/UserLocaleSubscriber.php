<?php

namespace Pronto\MobileBundle\EventSubscriber;


use Pronto\MobileBundle\Exception\ApiException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class UserLocaleSubscriber implements EventSubscriberInterface
{
    /**
     * @param RequestEvent $event
     */
    public function setDefaultLocale(RequestEvent $event): void
    {
        $request = $event->getRequest();

        $request->setLocale($request->headers->get('user-locale', 'en'));
    }

    /**
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents(): array
    {
        return [
            // Must have a higher priority than LocaleListener
            KernelEvents::REQUEST => ['setDefaultLocale', 102],
        ];
    }
}
