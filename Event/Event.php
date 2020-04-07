<?php


namespace Pronto\MobileBundle\Event;

use Symfony\Contracts\EventDispatcher\Event as BaseEvent;

abstract class Event extends BaseEvent
{
    /**
     * @return String
     */
    public abstract static function name(): String;
}
