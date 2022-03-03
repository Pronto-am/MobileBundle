<?php

namespace Pronto\MobileBundle\Middleware;

abstract class Middleware
{
    public function __construct()
    {
        $this->handle();
    }

    abstract public function handle(): void;
}
