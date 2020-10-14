<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Kernel;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class JsonRequestSubscriber implements EventSubscriberInterface
{
    public function decodeJsonContent(RequestEvent $event): void
    {
        $request = $event->getRequest();

        if (! $request->isMethod(Request::METHOD_POST)) {
            return;
        }

        $contentType = $request->headers->get('Content-Type');
        $content = $request->getContent();

        if ($contentType !== 'application/json' && ! $this->isJson($content)) {
            return;
        }

        $content = json_decode($request->getContent(), true);
        $event->getRequest()->request->replace(is_array($content) ? $content : []);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'decodeJsonContent',
        ];
    }

    private function isJson(string $string): bool
    {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
