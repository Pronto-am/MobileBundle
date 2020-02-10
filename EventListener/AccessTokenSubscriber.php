<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\User;

class AccessTokenSubscriber implements EventSubscriber
{
	/**
	 * @var EntityManagerInterface $entityManager
	 */
	private $entityManager;

	/**
	 * AccessTokenSubscriber constructor.
	 * @param EntityManagerInterface $entityManager
	 */
	public function __construct(EntityManagerInterface $entityManager)
	{
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
     * Post persist event
     *
     * @param LifecycleEventArgs $args
     * @throws \Exception
     */
	public function postPersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		if ($entity instanceof AccessToken) {
			$this->updateUser($entity);
		}
	}

    /**
     * @param AccessToken $accessToken
     * @throws \Exception
     */
	private function updateUser(AccessToken $accessToken): void
	{
		/** @var User $user */
		$user = $accessToken->getUser();

		if ($user !== null) {
			$user->setLastLogin(new \DateTime());

			$this->entityManager->persist($user);
			$this->entityManager->flush();
		}
	}
}
