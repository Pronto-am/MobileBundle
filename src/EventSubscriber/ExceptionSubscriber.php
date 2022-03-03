<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\JsonResponseException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        if ($exception instanceof ApiException) {
            $errorResponse = $exception->getResponse();
            $event->setResponse($errorResponse->getJsonResponse());
            return;
        }

        if ($exception instanceof JsonResponseException) {
            $event->allowCustomResponseCode();
            $event->setResponse($exception->response());
        }

        return;
    }
}
