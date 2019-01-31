<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\Cache;
use Pronto\MobileBundle\Service\PluginInitializer;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ApplicationVersionListener
{

	/**
	 * @var TokenStorageInterface
	 */
	private $tokenStorage;

	/**
	 * @var \Symfony\Component\HttpFoundation\Request
	 */
	private $request;

	/**
	 * @var PluginInitializer $initializer
	 */
	private $initializer;


	/**
	 * ApplicationVersionListener constructor.
	 * @param RequestStack $requestStack
	 * @param TokenStorageInterface $tokenStorage
	 * @param PluginInitializer $initializer
	 */
	public function __construct(RequestStack $requestStack, TokenStorageInterface $tokenStorage, PluginInitializer $initializer)
	{
		$this->tokenStorage = $tokenStorage;
		$this->request = $requestStack->getCurrentRequest();
		$this->initializer = $initializer;
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

		$this->initializeFirstVersion($entity, $args->getEntityManager());
	}


	/**
	 * @param Application $application
	 * @param EntityManager $entityManager
	 * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 */
	private function initializeFirstVersion(Application $application, EntityManager $entityManager): void
	{
		$version = new Version();
		$version->setName('V1');
		$version->setApplication($application);

		$entityManager->persist($version);
		$entityManager->flush();

		// Add the plugins and deactivate them
		$plugins = $entityManager->getRepository(Plugin::class)->findAll();

		/** @var Plugin $plugin */
		foreach ($plugins as $plugin) {
			$this->initializer->initialize($application, $plugin);
		}

		$entityManager->flush();

		$token = $this->tokenStorage->getToken();

		if ($token !== null && $entityManager->getRepository(Application::class)->count(['customer' => $application->getCustomer()]) === 1) {
			$this->request->getSession()->set(Version::SESSION_IDENTIFIER, $version->getId());
		}
	}
}