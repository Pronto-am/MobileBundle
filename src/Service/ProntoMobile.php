<?php

namespace Pronto\MobileBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class ProntoMobile
{
    public array $configuration;
    private ?Request $request;
    private ?string $activeModule;
    private EntityManagerInterface $entityManager;
    private ?Application\Version $applicationVersion;
    private Application $application;
    private Customer $customer;

    public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager, array $config)
    {
        $this->request = $requestStack->getCurrentRequest();
        $this->entityManager = $entityManager;
        $this->configuration = $config;

        // Set the needed properties
        $this->initialize();
    }

    private function initialize(): void
    {
        $this->setActiveModule();
    }

    private function setActiveModule(): void
    {
        // This part of the code doesn't work inside the terminal, so check for existance of the request object
        if ($this->request !== null) {
            $url = explode('/', $this->request->getRequestUri());

            if (count($url) > 0 && $url[1] === 'admin') {

                $differentModules = ['collections', 'notifications', 'users', 'versions'];

                // The active module is a larger string for above modules
                if (isset($url[2], $url[3]) && $url[3] !== 'edit' && $url[3] !== 'details' && in_array($url[2], $differentModules)) {
                    $this->activeModule = $url[2] . '/' . $url[3];
                } else {
                    $this->activeModule = $url[2] ?? null;
                }

                // Remove the query string
                $this->activeModule = strtok($this->activeModule, '?');
            }
        }
    }

    public function getActiveModule(): ?string
    {
        return $this->activeModule;
    }

    public function getApplicationVersion(): ?Application\Version
    {
        return $this->applicationVersion;
    }

    public function setApplicationVersion(Application\Version $applicationVersion): void
    {
        $this->applicationVersion = $applicationVersion;

        // Also set the application
        $this->setApplication($applicationVersion->getApplication());
    }

    public function getApplication(): ?Application
    {
        return $this->application;
    }

    public function setApplication(Application $application): void
    {
        $this->application = $application;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(Customer $customer): void
    {
        $this->customer = $customer;
    }

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
     * @param int|Application|null $application
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function getPluginConfiguration(string $plugin, $application = null): array
    {
        $application = $application ?? $this->application;

        if (!$application instanceof Application) {
            $application = $this->entityManager->getRepository(Application::class)->find($application);
        }

        /** @var ApplicationPlugin $plugin */
        $plugin = $this->entityManager->getRepository(ApplicationPlugin::class)->findOneByApplicationAndIdentifier($application, $plugin);

        return $plugin->getConfig();
    }

    public function getConfiguration($node = null, $default = null)
    {
        // Return a specific node if it exists
        if ($node !== null) {
            return $this->configuration[$node] ?? $default;
        }

        return $this->configuration;
    }
}
