<?php

namespace Pronto\MobileBundle\Provider;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AppUser;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class AppUserProvider implements UserProviderInterface
{
	/** @var EntityManagerInterface $entityManager */
	protected $entityManager;


	/**
	 * AppUserProvider constructor.
	 * @param EntityManagerInterface $entityManager
	 */
	public function __construct(EntityManagerInterface $entityManager)
	{
		$this->entityManager = $entityManager;
	}


	/**
	 * Get user by email address
	 *
	 * @param string $email
	 * @return UserInterface
	 */
	public function loadUserByUsername($email): UserInterface
	{
		/** @var AppUser $user */
		$user = $this->entityManager->getRepository(AppUser::class)->findOneBy([
			'email'           => $email,
			'activated'       => true
		]);

		if ($user === null) {
			$message = sprintf('Unable to find an active AppUser identified by "%s".', $email);

			throw new UsernameNotFoundException($message, 404);
		}

		return $user;
	}


	/**
	 * Refresh the user
	 *
	 * @param UserInterface|AppUser $user
	 * @return null|object|UserInterface
	 */
	public function refreshUser(UserInterface $user)
	{
		$class = get_class($user);

		if (!$this->supportsClass($class)) {
			throw new UnsupportedUserException(
				sprintf(
					'Instances of "%s" are not supported.',
					$class
				)
			);
		}

		return $this->entityManager->getRepository(AppUser::class)->find($user->getId());
	}


	/**
	 * @param string $class
	 * @return bool
	 */
	public function supportsClass($class): bool
	{
		return AppUser::class === $class || is_subclass_of($class, AppUser::class);
	}
}