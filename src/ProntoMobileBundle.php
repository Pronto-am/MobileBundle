<?php

declare(strict_types=1);

namespace Pronto\MobileBundle;

use Pronto\MobileBundle\DependencyInjection\ProntoMobileExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class ProntoMobileBundle extends Bundle
{
    public function getContainerExtension(): ProntoMobileExtension
    {
        return new ProntoMobileExtension();
    }
}
