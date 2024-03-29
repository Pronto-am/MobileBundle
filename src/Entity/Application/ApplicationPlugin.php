<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Application;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;

/**
 * Class ApplicationPlugin
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'application_plugins')]
#[ORM\Entity(repositoryClass: 'Pronto\MobileBundle\Repository\Application\PluginRepository')]
class ApplicationPlugin
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Application', inversedBy: 'applicationPlugins')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $application;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Plugin', inversedBy: 'applicationPlugins')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $plugin;

    #[ORM\Column(type: 'boolean')]
    private $active = false;

    #[ORM\Column(type: 'json')]
    private $config;

    public function __construct(Application $application, Plugin $plugin)
    {
        $this->application = $application;
        $this->plugin = $plugin;
    }

    /**
     * @return Application
     */
    public function getApplication(): Application
    {
        return $this->application;
    }

    /**
     * @param Application $application
     */
    public function setApplication(Application $application): void
    {
        $this->application = $application;
    }

    /**
     * @return Plugin
     */
    public function getPlugin(): Plugin
    {
        return $this->plugin;
    }

    /**
     * @param Plugin $plugin
     */
    public function setPlugin(Plugin $plugin): void
    {
        $this->plugin = $plugin;
    }

    /**
     * @return bool
     */
    public function getActive(): bool
    {
        return $this->active;
    }

    /**
     * @param bool $active
     */
    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    /**
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @param array $config
     */
    public function setConfig(array $config): void
    {
        $this->config = $config;
    }
}
