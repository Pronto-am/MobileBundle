<?php

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\BelongsToApplicationInterface;
use Pronto\MobileBundle\Service\ProntoMobile;
use Psr\Container\ContainerInterface;

class BelongsToApplicationSubscriber implements EventSubscriber
{
	/**
	 * @var EntityManagerInterface $entityManager
	 */
	private $entityManager;

    /**
     * @var ProntoMobile $prontoMobile
     */
	private $prontoMobile;

    /**
     * AccessTokenSubscriber constructor.
     * @param EntityManagerInterface $entityManager
     * @param ContainerInterface $container
     */
	public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container)
	{
		$this->entityManager = $entityManager;
		$this->prontoMobile = $container->get('pronto_mobile.global.app');
	}

	/**
	 * Returns an array of events this subscriber wants to listen to.
	 *
	 * @return string[]
	 */
	public function getSubscribedEvents(): array
	{
		return [Events::prePersist];
	}

    /**
     * Post persist event
     *
     * @param LifecycleEventArgs $args
     * @throws \Exception
     */
	public function prePersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		if ($entity instanceof BelongsToApplicationInterface) {
		    /** @var Application $application */
		    $application = $this->entityManager->getReference(Application::class, $this->prontoMobile->getApplication()->getId());
		    $entity->setApplication($application);
		}
	}
}
