<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('pronto_mobile');

        $treeBuilder
            ->getRootNode()
            ->children()
            ->scalarNode('domain')->end()
            ->scalarNode('uploads_folder')->end()
            ->arrayNode('firebase')
            ->children()
            ->scalarNode('storage_decryption_password')->end()
            ->end()
            ->end()// Firebase end
            ->end();

        return $treeBuilder;
    }
}
