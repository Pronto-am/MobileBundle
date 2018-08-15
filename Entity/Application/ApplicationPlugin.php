<?php

namespace Pronto\MobileBundle\Entity\Application;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;
use Doctrine\ORM\Mapping as ORM;


/**
 * Class ApplicationPlugin
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Application\PluginRepository")
 * @ORM\Table(name="application_plugins")
 */
class ApplicationPlugin
{
    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application", inversedBy="applicationPlugins")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $application;


    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Plugin", inversedBy="applicationPlugins")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $plugin;


    /**
     * @ORM\Column(type="boolean")
     */
    private $active = false;


    /**
     * @ORM\Column(type="json_array")
     */
    private $config;


    public function __construct(Application $application, Plugin $plugin)
    {
        $this->application = $application;
        $this->plugin = $plugin;
    }


    /**
     * @return mixed
     */
    public function getApplication()
    {
        return $this->application;
    }


    /**
     * @param mixed $application
     */
    public function setApplication($application): void
	{
        $this->application = $application;
    }


    /**
     * @return mixed
     */
    public function getPlugin()
    {
        return $this->plugin;
    }


    /**
     * @param mixed $plugin
     */
    public function setPlugin($plugin): void
    {
        $this->plugin = $plugin;
    }


    /**
     * @return mixed
     */
    public function getActive()
    {
        return $this->active;
    }


    /**
     * @param mixed $active
     */
    public function setActive($active): void
    {
        $this->active = $active;
    }


    /**
     * @return mixed
     */
    public function getConfig()
    {
        return $this->config;
    }


    /**
     * @param mixed $config
     */
    public function setConfig($config): void
    {
        $this->config = $config;
    }
}