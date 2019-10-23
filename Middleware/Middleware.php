<?php

namespace Pronto\MobileBundle\Middleware;

/**
 * Class Middleware
 * @package Pronto\MobileBundle\Middleware
 */
abstract class Middleware
{
    /**
     * Middleware constructor.
     */
    public function __construct()
    {
        $this->handle();
    }

    /**
     * @return void
     */
    abstract public function handle(): void;
}
