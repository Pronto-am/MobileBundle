<?php

namespace Pronto\MobileBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;

class PluginInitializer
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function initialize(Application $application, Plugin $plugin): void
    {
        $applicationPlugin = new ApplicationPlugin($application, $plugin);
        $defaultConfig = $plugin->getDefaultConfig();

        $config = [];

        // Create plugin config, with just key and value
        foreach ($defaultConfig as $key => $setting) {
            if (isset($setting['value']) && preg_match('/[{]{1}[a-zA-z]+[}]{1}/', $setting['value']) > 0) {
                $config[$key] = $setting['value'];

                // Replace all placeholders
                foreach ($setting['placeholders'] as $identifier => $getter) {
                    $value = '';

                    // Check if the entity has the placeholder generation method
                    if (method_exists($application, $getter)) {
                        $value = $application->{$getter}();
                    } elseif (method_exists($this, $getter)) {
                        // The method could also exist in this service
                        $value = $this->{$getter}();
                    }

                    $config[$key] = str_replace('{' . $identifier . '}', $value, $config[$key]);
                }
            } else {
                $config[$key] = $setting['value'] ?? '';
            }
        }

        $applicationPlugin->setConfig($config);

        $this->entityManager->persist($applicationPlugin);
        $this->entityManager->flush();
    }
}
