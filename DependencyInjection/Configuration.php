<?php

namespace Pronto\MobileBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;


class Configuration implements ConfigurationInterface
{
	/**
	 * @return TreeBuilder
	 */
	public function getConfigTreeBuilder(): TreeBuilder
	{
		$treeBuilder = new TreeBuilder();
		$rootNode = $treeBuilder->root('pronto_mobile');

		$rootNode
			->children()
				->scalarNode('domain')->end()
				->scalarNode('uploads_folder')->end()
				->arrayNode('firebase')
					->children()
					->scalarNode('storage_decryption_method')->end()
					->scalarNode('storage_decryption_password')->end()
					->end()
				->end()// Firebase end
			->end();

		return $treeBuilder;
	}
}