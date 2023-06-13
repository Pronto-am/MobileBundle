<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\User;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserRepository extends EntityRepository implements PasswordUpgraderInterface, UserLoaderInterface
{
    public function loadUserByIdentifier(string $identifier): ?User
    {
        return $this->findActiveByEmail($identifier);
    }

    /** @deprecated since Symfony 5.3 */
    public function loadUserByUsername(string $username): ?User
    {
        return $this->loadUserByIdentifier($username);
    }

    /**
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

    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->flush($user);
    }
}
