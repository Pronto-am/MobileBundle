<?php

namespace Pronto\MobileBundle\DependencyInjection;


use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\ConfigurableExtension;

class ProntoMobileExtension extends ConfigurableExtension
{
	/**
	 * Configures the passed container according to the merged configuration.
	 * @param array $mergedConfig
	 * @param ContainerBuilder $container
	 * @throws \Exception
	 */
	protected function loadInternal(array $mergedConfig, ContainerBuilder $container): void
	{
		$loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
		$loader->load('services.yaml');

		$prontoMobile = $container->getDefinition('pronto_mobile.global.app');
		$prontoMobile->addMethodCall('setConfiguration', [$mergedConfig]);
	}
}
