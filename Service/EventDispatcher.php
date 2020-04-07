<?php


namespace Pronto\MobileBundle\Service;


use Pronto\MobileBundle\Event\Event;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class EventDispatcher
{
    /**
     * @var EventDispatcherInterface $dispatcher
     */
    private $dispatcher;

    /**
     * EventDispatcher constructor.
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * @param Event $event
     */
    public function dispatch(Event $event)
    {
        $this->dispatcher->dispatch($event, $event->name());
    }
}
