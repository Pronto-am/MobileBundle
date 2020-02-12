<?php


namespace Pronto\MobileBundle\Service;


class TestInjectionService
{
    public $uploadsDir;

    /**
     * TestInjectionService constructor.
     * @param string $uploadsDir
     */
    public function __construct(string $uploadsDir)
    {
        $this->uploadsDir = $uploadsDir;
    }
}
