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
	 * @var string $activeModule
	 */
	private $activeModule;

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
	 * @param RequestStack $requestStack
	 * @param EntityManagerInterface $entityManager
	 */
	public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager)
	{
		$this->request = $requestStack->getCurrentRequest();
		$this->entityManager = $entityManager;

		// Set the needed properties
		$this->initialize();
	}

	/**
	 * Initialize the Pronto Mobile service with it's properties
	 */
	private function initialize(): void
	{
		$this->setActiveModule();
	}

	/**
	 * Set the active module
	 */
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

	/**
	 * Get the active module
	 *
	 * @return string|null
	 */
	public function getActiveModule(): ?string
	{
		return $this->activeModule;
	}

	/**
	 * @param Application\Version $applicationVersion
	 */
	public function setApplicationVersion(Application\Version $applicationVersion): void
	{
		$this->applicationVersion = $applicationVersion;

		// Also set the application
		$this->setApplication($applicationVersion->getApplication());
	}

	/**
	 * @return Application\Version|null
	 */
	public function getApplicationVersion(): ?Application\Version
	{
		return $this->applicationVersion;
	}

	/**
	 * @param Application $application
	 */
	public function setApplication(Application $application): void
	{
		$this->application = $application;
	}

	/**
	 * @return Application|null
	 */
	public function getApplication(): ?Application
	{
		return $this->application;
	}

	/**
	 * @param Customer $customer
	 */
	public function setCustomer(Customer $customer): void
	{
		$this->customer = $customer;
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

		if(!$application instanceof Application) {
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
