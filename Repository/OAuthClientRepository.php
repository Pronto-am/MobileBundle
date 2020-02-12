<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\OAuthClient;

class OAuthClientRepository extends EntityRepository
{
    /**
     * Get the internal OAuth Client
     * @throws \Doctrine\ORM\NonUniqueResultException
     * @throws \Doctrine\ORM\NoResultException
     */
    public function getInternalClient()
    {
        return $this->createQueryBuilder('client')->where('client.application IS NULL')->getQuery()->getSingleResult();
    }

    /**
     * @param string $randomId
     * @param string $secret
     * @return Application|null
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByCredentials(string $randomId, string $secret): ?OAuthClient
    {
        return $this->createQueryBuilder('client')
            ->where('client.randomId = :randomId')
            ->andWhere('client.secret = :secret')
            ->setParameters([
                'randomId' => $randomId,
                'secret'   => $secret,
            ])->getQuery()->getSingleResult();
    }
}
