<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\NonUniqueResultException;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class UserRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return User::class;
    }

    /**
     * @return PaginationResponse
     */
    public function paginate(): PaginationResponse
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.customer = :customer')
            ->setParameter('customer', $this->prontoMobile->getCustomer());

        if($this->filters->isSearching()) {
            $query = $query->andWhere('entity.firstName LIKE :search OR entity.lastName LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

    /**
     * Get the user by email and active state
     *
     * @param string $email
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findActiveByEmail(string $email)
    {
        return $this->createQueryBuilder('user')
            ->andWhere('user.password IS NOT NULL')
            ->andWhere('user.activationToken IS NULL')
            ->andWhere('user.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * Find a user for the OAuth UserProvider
     * @param string $email
     * @param Application|null $application
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function findForAuthentication(string $email, ?Application $application)
    {
        $parameters = [
            'appUser'   => $application !== null,
            'email'     => $email,
            'activated' => true,
        ];

        $query = $this->createQueryBuilder('user')
            ->andWhere('user.appUser = :appUser')
            ->andWhere('user.email = :email')
            ->andWhere('user.activated = :activated');

        if ($application !== null) {
            $query = $query->andWhere('user.application = :application');
            $parameters['application'] = $application;
        } else {
            $query = $query->andWhere('user.application IS NULL');
        }

        return $query->setParameters($parameters)->getQuery()->getOneOrNullResult();
    }

    /**
     * Get all users by customer with optionally the super administrators
     *
     * @param Customer $customer
     * @param bool $superAdministratorsIncluded
     * @param array $select
     * @return mixed
     */
    public function findAllByCustomer(Customer $customer, bool $superAdministratorsIncluded = false, array $select = [])
    {
        $query = $this->createQueryBuilder('user');

        // Add the optional select attributes
        if (!empty($select)) {
            $query->select(implode(', ', $select));
        }

        $query->where('user.customer = :customer');

        // Include super administrators
        if ($superAdministratorsIncluded) {
            $query->orWhere('user.customer IS NULL');
        }

        return $query->setParameter('customer', $customer)
            ->getQuery()
            ->execute();
    }
}
