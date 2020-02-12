<?php

namespace Pronto\MobileBundle\Service;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class ProntoMobile
{
    /**
     * @var Request $request
     */
    private $request;

    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * @var Application\Version $applicationVersion
     */
    private $applicationVersion;

    /**
     * @var Application $application
     */
    private $application;

    /**
     * @var Customer $customer
     */
    private $customer;

    /**
     * @var array $configuration
     */
    public $configuration;

    /**
     * AppInitiator constructor.
     * @param EntityManagerInterface $entityManager
     * @param array $mergedConfig
     */
    public function __construct(EntityManagerInterface $entityManager, array $mergedConfig = [])
    {
        $this->entityManager = $entityManager;
        $this->configuration = $mergedConfig;
    }

    /**
     * @required
     * @param RequestStack $requestStack
     */
    public function setRequest(RequestStack $requestStack)
    {
        $this->request = $requestStack->getCurrentRequest();

        if ($this->request->headers->has('Application-Version-Id')) {
            $this->applicationVersion = $this->entityManager->getRepository(Application\Version::class)->find($this->request->headers->get('Application-Version-Id'));
            $this->application = $this->applicationVersion->getApplication();
            $this->customer = $this->application->getCustomer();
        }
    }

    /**
     * @return Application\Version|null
     */
    public function getApplicationVersion(): ?Application\Version
    {
        return $this->applicationVersion;
    }

    /**
     * @return Application|null
     */
    public function getApplication(): ?Application
    {
        return $this->application;
    }

    /**
     * @return Customer|null
     */
    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    /**
     * Check if a plugin is active
     *
     * @param $identifier
     * @return bool
     */
    public function pluginIsActive($identifier): bool
    {
        if ($this->applicationVersion === null) {
            return false;
        }

        // Get the plugins for the application
        $plugins = $this->application->getApplicationPlugins();

        $plugins = array_filter($plugins->getValues(), function ($plugin) use ($identifier) {
            /** @var ApplicationPlugin $plugin */
            return $plugin->getActive() && $plugin->getPlugin()->getIdentifier() === $identifier;
        });

        return !empty($plugins);
    }

    /**
     * Get the plugin configuration
     *
     * @param $plugin
     * @param Application|int|null $application
     * @return array
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getPluginConfiguration($plugin, $application = null): array
    {
        $application = $application ?? $this->application;

        if (!$application instanceof Application) {
            $application = $this->entityManager->getRepository(Application::class)->find($application);
        }

        /** @var ApplicationPlugin $plugin */
        $plugin = $this->entityManager->getRepository(ApplicationPlugin::class)->findOneByApplicationAndIdentifier($application, $plugin);

        return $plugin->getConfig();
    }

    /**
     * Set the bundle configuration
     *
     * @param array $config
     */
    public function setConfiguration(array $config): void
    {
        $this->configuration = $config;
    }

    /**
     * Get the configuration of the bundle
     *
     * @param null $node
     * @param null $default
     * @return array|string|integer
     */
    public function getConfiguration($node = null, $default = null)
    {
        // Return a specific node if it exists
        if ($node !== null) {
            return $this->configuration[$node] ?? $default;
        }

        return $this->configuration;
    }
}
