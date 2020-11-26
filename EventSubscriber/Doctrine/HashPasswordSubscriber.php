<?php

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;


use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class HashPasswordSubscriber implements EventSubscriber
{
	/**
	 * @var UserPasswordEncoderInterface $passwordEncoder
	 */
	private $passwordEncoder;

	public function __construct(UserPasswordEncoderInterface $passwordEncoder)
	{
		$this->passwordEncoder = $passwordEncoder;
	}

	public function getSubscribedEvents(): array
	{
		return [Events::prePersist, Events::preUpdate];
	}

	public function prePersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		// Only instances of app users and regular users need to be checked
		if (!$entity instanceof User && !$entity instanceof AppUser) {
			return;
		}

		$this->encodePassword($entity);
	}

	public function preUpdate(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		// Only instances of app users and regular users need to be checked
		if (!$entity instanceof User && !$entity instanceof AppUser) {
			return;
		}

		$this->encodePassword($entity);

		// To tell EventListener that the entity has been updated
		$em = $args->getEntityManager();
		$meta = $em->getClassMetadata(get_class($entity));
		$em->getUnitOfWork()->recomputeSingleEntityChangeSet($meta, $entity);
	}

	private function encodePassword($user): void
	{
		if (!$user->getPlainPassword()) {
			return;
		}

		$encoded = $this->passwordEncoder->encodePassword(
			$user,
			$user->getPlainPassword()
		);

		$user->setPassword($encoded);
	}
}
