<?php

namespace Pronto\MobileBundle\EventListener;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\AppUser;

class AccessTokenListener
{
	/** @var EntityManagerInterface $entityManager */
	private $entityManager;


	/**
	 * Post persist event
	 *
	 * @param LifecycleEventArgs $args
	 */
    public function postPersist(LifecycleEventArgs $args): void
	{
    	$this->entityManager = $args->getEntityManager();

        $entity = $args->getEntity();

        if($entity instanceof AccessToken) {
			$this->updateUser($entity);
		}
    }


	/**
	 * Update the user
	 *
	 * @param AccessToken $accessToken
	 */
    private function updateUser(AccessToken $accessToken): void
	{
    	/** @var AppUser $user */
    	$user = $accessToken->getUser();

    	if($user !== null) {
    		$user->setLastLogin(new \DateTime());

    		$this->entityManager->persist($user);
    		$this->entityManager->flush();
		}
	}
}