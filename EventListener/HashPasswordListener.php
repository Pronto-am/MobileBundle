<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\ORM\Event\LifecycleEventArgs;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class HashPasswordListener
{
	/** @var UserPasswordEncoderInterface $passwordEncoder */
	private $passwordEncoder;


	/**
	 * HashPasswordListener constructor.
	 * @param UserPasswordEncoderInterface $passwordEncoder
	 */
	public function __construct(UserPasswordEncoderInterface $passwordEncoder)
	{
		$this->passwordEncoder = $passwordEncoder;
	}


	/**
	 * Pre persist listener
	 *
	 * @param LifecycleEventArgs $args
	 */
	public function prePersist(LifecycleEventArgs $args): void
	{
		$entity = $args->getEntity();

		// Only instances of app users and regular users need to be checked
		if (!$entity instanceof User && !$entity instanceof AppUser) {
			return;
		}

		$this->encodePassword($entity);
	}


	/**
	 * Pre update listener
	 *
	 * @param LifecycleEventArgs $args
	 */
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


	/**
	 * Encode the users' password
	 *
	 * @param User|AppUser|object $user
	 */
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