<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DependencyInjection;

use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\ConfigurableExtension;

class ProntoMobileExtension extends ConfigurableExtension
{
    protected function loadInternal(array $mergedConfig, ContainerBuilder $container): void
    {
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yaml');

        $prontoMobile = $container->getDefinition(ProntoMobile::class);
        $prontoMobile->replaceArgument(2, $mergedConfig);
    }
}
