<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\PluginInitializer;

class PluginSubscriber implements EventSubscriber
{
	/**
	 * @var PluginInitializer $initializer
	 */
	private $initializer;

	/**
	 * @var EntityManagerInterface $entityManager
	 */
	private $entityManager;


	/**
	 * PluginSubscriber constructor.
	 * @param PluginInitializer $initializer
	 * @param EntityManagerInterface $entityManager
	 */
	public function __construct(PluginInitializer $initializer, EntityManagerInterface $entityManager)
	{
		$this->initializer = $initializer;
		$this->entityManager = $entityManager;
	}

	/**
	 * Returns an array of events this subscriber wants to listen to.
	 *
	 * @return string[]
	 */
	public function getSubscribedEvents(): array
	{
		return [Events::postPersist];
	}

	/**
	 * @param LifecycleEventArgs $args
	 */
	public function postPersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		if (!$entity instanceof Plugin) {
			return;
		}

		$this->initializeFirstVersion($entity);
	}

	/**
	 * @param Plugin $plugin
	 */
	private function initializeFirstVersion(Plugin $plugin): void
	{
		$applications = $this->entityManager->getRepository(Application::class)->findAll();

		foreach ($applications as $application) {
			$this->initializer->initialize($application, $plugin);
		}
	}
}