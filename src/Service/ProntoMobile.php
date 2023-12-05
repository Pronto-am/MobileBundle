<?php

namespace Pronto\MobileBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class ProntoMobile
{
    public array $configuration;
    private ?Request $request;
    private bool $statelessRequest;
    private ?string $activeModule = null;

    private ?Customer $customer = null;
    private ?Application $application = null;
    private ?Version $applicationVersion = null;

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        RequestStack $requestStack,
        array $config
    ) {
        $this->request = $requestStack->getCurrentRequest();
        $this->configuration = $config;

        $this->statelessRequest = $this->request?->attributes->get('_stateless', false) ?? true;

        // Set the needed properties
        $this->initialize();
    }

    private function initialize(): void
    {
        $this->setActiveModule();

        // Get the selected application, version and customer
        $this->setSelectedCustomer();
        $this->setSelectedApplicationVersion();
    }

    private function setSelectedCustomer(): void
    {
        if (!$this->request instanceof Request || $this->statelessRequest) {
            return;
        }

        // Get the id from the session
        $session = $this->request->getSession();
        $id = $session?->get(Customer::SESSION_IDENTIFIER);

        if ($id === null) {
            return;
        }

        // Get the customer from the repository
        $customer = $this->entityManager->getRepository(Customer::class)->find($id);

        // Add the customer to the ProntoMobile service
        if ($customer instanceof Customer) {
            $this->setCustomer($customer);
        }
    }

    private function setSelectedApplicationVersion(): void
    {
        if (!$this->request instanceof Request || $this->statelessRequest) {
            return;
        }

        // Get the id from the session
        $session = $this->request->getSession();
        $id = $session->get(Version::SESSION_IDENTIFIER);

        if ($id === null) {
            return;
        }

        // Get the application version from the repository
        $applicationVersion = $this->entityManager->getRepository(Version::class)->find($id);

        // Add the version to the ProntoMobile service
        if ($applicationVersion instanceof Version) {
            $this->setApplicationVersion($applicationVersion);
        }
    }

    private function setActiveModule(): void
    {
        // This part of the code doesn't work inside the terminal, so check for existance of the request object
        if (!$this->request instanceof Request || $this->statelessRequest) {
            return;
        }

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

    public function getActiveModule(): ?string
    {
        return $this->activeModule;
    }

    public function getApplicationVersion(): ?Version
    {
        return $this->applicationVersion;
    }

    public function setApplicationVersion(Version $applicationVersion): void
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
        if (!$this->applicationVersion instanceof Version) {
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

    public function getPluginConfiguration(string $plugin, int|Application|null $application = null): array
    {
        $application = $application ?? $this->application;

        if (!$application instanceof Application) {
            $application = $this->entityManager->getRepository(Application::class)->find($application);
        }

        /** @var ApplicationPlugin $applicationPlugin */
        $applicationPlugin = $this->entityManager->getRepository(ApplicationPlugin::class)
            ->findOneByApplicationAndIdentifier(
                application: $application,
                identifier: $plugin
            );

        return $applicationPlugin->getConfig();
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
