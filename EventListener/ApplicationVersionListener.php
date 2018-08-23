<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\Cache;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ApplicationVersionListener
{

	/** @var TokenStorageInterface */
	private $tokenStorage;

	/** @var \Symfony\Component\HttpFoundation\Request */
	private $request;

	/** @var Application $application */
	private $application;


	/**
	 * ApplicationVersionListener constructor.
	 * @param RequestStack $requestStack
	 * @param TokenStorageInterface $tokenStorage
	 */
	public function __construct(RequestStack $requestStack, TokenStorageInterface $tokenStorage)
	{
		$this->tokenStorage = $tokenStorage;
		$this->request = $requestStack->getCurrentRequest();
	}


	/**
	 * Handle the post persist event of an application object
	 *
	 * @param LifecycleEventArgs $args
	 * @throws \Doctrine\ORM\ORMException
	 */
	public function postPersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		if (!$entity instanceof Application) {
			return;
		}

		$this->application = $entity;

		$this->initializeFirstVersion($args->getEntityManager());
	}


	/**
	 * @param EntityManager $entityManager
	 * @throws \Doctrine\ORM\ORMException
	 */
	private function initializeFirstVersion(EntityManager $entityManager): void
	{
		$version = new Version();
		$version->setName('V1');
		$version->setApplication($this->application);

		$entityManager->persist($version);
		$entityManager->flush();

		// Add the plugins and deactivate them
		$plugins = $entityManager->getRepository(Plugin::class)->findAll();

		/** @var Plugin $plugin */
		foreach ($plugins as $plugin) {
			$applicationPlugin = new ApplicationPlugin($version->getApplication(), $plugin);

			// Generate the applications' plugin configuration
			$config = $this->getApplicationConfiguration($plugin);

			$applicationPlugin->setConfig($config);

			$entityManager->persist($applicationPlugin);
		}

		$entityManager->flush();

		$token = $this->tokenStorage->getToken();

		if ($token !== null && $entityManager->getRepository(Application::class)->count(['customer' => $this->application->getCustomer()]) === 1) {
			$this->request->getSession()->set(Version::SESSION_IDENTIFIER, $version->getId());
		}
	}


	/**
	 * @param Plugin $plugin
	 * @return array
	 */
	private function getApplicationConfiguration(Plugin $plugin): array
	{
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
					if (method_exists($this->application, $getter)) {
						$value = $this->application->{$getter}();
					} elseif (method_exists($this, $getter)) {
						// The method could also exist in this listener
						$value = $this->{$getter}();
					}

					$config[$key] = str_replace('{' . $identifier . '}', $value, $config[$key]);
				}
			} else {
				$config[$key] = $setting['value'] ?? '';
			}
		}

		return $config;
	}
}