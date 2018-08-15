<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Customer;
use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
	/**
	 * Get the user by email and active state
	 *
	 * @param $email
	 * @return mixed
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
	public function findActiveByEmail($email) {
		return $this->createQueryBuilder('user')
			->andWhere('user.password IS NOT NULL')
			->andWhere('user.activationToken IS NULL')
			->andWhere('user.email = :email')
			->setParameter('email', $email)
			->getQuery()
			->getOneOrNullResult();
	}


	/**
	 * Get all users by customer with optionally the super administrators
	 *
	 * @param Customer $customer
	 * @param bool $superAdministratorsIncluded
	 * @param array $select
	 * @return mixed
	 */
    public function findAllByCustomer(Customer $customer, bool $superAdministratorsIncluded = false, array $select = []) {
        $query = $this->createQueryBuilder('user');

        // Add the optional select attributes
        if(!empty($select)) {
        	$query->select(implode(', ', $select));
		}

        $query->where('user.customer = :customer');

        // Include super administrators
        if($superAdministratorsIncluded) {
			$query->orWhere('user.customer IS NULL');
		}

        return $query->setParameter('customer', $customer)
            ->getQuery()
            ->execute();
    }
}