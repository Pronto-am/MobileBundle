<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Kernel;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class SetLocaleSusbcriber implements EventSubscriberInterface
{
    public function changeLocale(RequestEvent $event): void
    {
        // Determine the locale
        $request = $event->getRequest();

        if ($request->headers->has('Accept-Language')) {
            // Parses all possible locales to a key value array:
            // nl-NL: ["language": "nl", "region": "NL"]
            // nl: ["language": "nl"]
            // etc.

            ['language' => $language] = locale_parse($request->headers->get('Accept-Language'));
            $request->setLocale($language);
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => [
                ['changeLocale', 114],
            ]
        ];
    }
}
