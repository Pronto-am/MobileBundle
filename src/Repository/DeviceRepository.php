<?php

namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\PushNotification;

class DeviceRepository extends EntityRepository
{
    /**
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function findRecipientsCountByApplication(Application $application, bool $isTest = false)
    {
        $query = $this->createQueryBuilder('devices')
            ->select('count(devices.id)')
            ->where('devices.application = :application')
            ->setParameter('application', $application)
            ->andWhere('devices.tokenState = 1');

        if ($isTest) {
            $query->andWhere('devices.testDevice = 1');
        }

        return $query->getQuery()->getSingleScalarResult();
    }

    public function findRecipientsByApplication(Application $application, bool $isTest)
    {
        $query = $this->createQueryBuilder('devices')
            ->andWhere('devices.application = :application')
            ->setParameter('application', $application)
            ->andWhere('devices.tokenState = 1');

        if ($isTest) {
            $query->andWhere('devices.testDevice = 1');
        }

        return $query->getQuery()->execute();
    }

    public function findNotificationRecipientsByLanguage(PushNotification $notification, string $language, bool $isTest)
    {
        $query = $this->createQueryBuilder('devices')
            ->select('devices.firebaseToken, devices.id')
            ->andWhere('devices.application = :application')
            ->setParameter('application', $notification->getApplication())
            ->andWhere('devices.tokenState = 1')
            ->andWhere('devices.language = :language')
            ->setParameter('language', $language);

        if ($notification->getSegment() !== null) {
            $query->leftJoin('devices.deviceSegments', 'segments')
                ->andWhere('segments.segment = :segment')
                ->setParameter('segment', $notification->getSegment());
        }

        if ($isTest) {
            $query->andWhere('devices.id IN (:testDevices)');
            $query->setParameter('testDevices', $notification->getTestDevices());
        }

        return $query->getQuery()->execute();
    }

    public function findNotificationRecipientsByExcludeLanguages(PushNotification $notification, array $excludeLanguages, bool $isTest)
    {
        $query = $this->createQueryBuilder('devices')
            ->select('devices.firebaseToken, devices.id')
            ->andWhere('devices.application = :application')
            ->setParameter('application', $notification->getApplication())
            ->andWhere('devices.tokenState = 1')
            ->andWhere('devices.language NOT IN (:languages)')
            ->setParameter('languages', $excludeLanguages);

        if ($notification->getSegment() !== null) {
            $query->leftJoin('devices.deviceSegments', 'segments')
                ->andWhere('segments.segment = :segment')
                ->setParameter('segment', $notification->getSegment());
        }

        if ($isTest) {
            $query->andWhere('devices.id IN (:testDevices)');
            $query->setParameter('testDevices', $notification->getTestDevices());
        }

        return $query->getQuery()->execute();
    }

    public function findDevicesWithoutFirebaseToken()
    {
        return $this->createQueryBuilder('devices')
            ->select('devices.application, GROUP_CONCAT(devices.apnsToken)')
            ->andWhere('devices.firebaseToken IS NULL')
            ->groupBy('devices.application')
            ->getQuery()
            ->execute();
    }

    public function setDisabledByTokens(array $tokens)
    {
        return $this->createQueryBuilder('devices')->update()
            ->set('devices.tokenState', 0)
            ->where('devices.firebaseToken IN(:tokens)')
            ->setParameter('tokens', $tokens)
            ->getQuery()
            ->execute();
    }

    public function updateToken($oldToken, $newToken)
    {
        return $this->createQueryBuilder('devices')->update()
            ->set('devices.firebaseToken', ':newToken')
            ->setParameter('newToken', $newToken)
            ->where('devices.firebaseToken = :oldToken')
            ->setParameter('oldToken', $oldToken)
            ->getQuery()
            ->execute();
    }

    public function getByMissingFirebaseToken(Application $application)
    {
        return $this->createQueryBuilder('devices')
            ->select('devices.apnsToken')
            ->where('devices.firebaseToken IS NULL')
            ->andWhere('devices.application = :application')
            ->setParameter('application', $application)
            ->getQuery()
            ->execute();
    }

    public function addFirebaseToken(int $applicationId, string $apnsToken, string $firebaseToken)
    {
        return $this->createQueryBuilder('devices')->update()
            ->set('devices.firebaseToken', ':firebaseToken')
            ->setParameter('firebaseToken', $firebaseToken)
            ->where('devices.apnsToken = :apnsToken')
            ->setParameter('apnsToken', $apnsToken)
            ->andWhere('devices.application = :id')
            ->setParameter('id', $applicationId)
            ->getQuery()
            ->execute();
    }
}
