<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class DeviceRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Device::class;
    }

    /**
     * @return PaginationResponse
     */
    public function paginate(): PaginationResponse
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.application = :application')
            ->setParameter('application', $this->prontoMobile->getApplication());

        if($this->filters->isSearching()) {
            $query = $query->andWhere('entity.name LIKE :search OR entity.manufacturer LIKE :search')
                ->setParameter('search', '%' . $this->filters->searchValue() . '%');
        }

        return $this->paginateQuery($query);
    }

    /**
     * @return mixed
     */
    public function list()
    {
        $query = $this->createQueryBuilder('entity')
            ->where('entity.application = :application')
            ->setParameter('application', $this->prontoMobile->getApplication());

        // Filter on segment
        if($this->filters->get('segment_id') !== null) {
            $query->leftJoin('entity.deviceSegments', 'segment')
                ->andWhere('segment.segment = :segment')
                ->setParameter('segment', $this->filters->get('segment_id'));
        }

        // Filter based on test value
        if($this->filters->get('test') !== null) {
            $query->andWhere('entity.testDevice = :test')->setParameter('test', $this->filters->get('test'));
        }

        return $this->listQuery($query);
    }

    /**
     * @param Application $application
     * @param $isTest
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     * @throws \Doctrine\ORM\NoResultException
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


    /**
     * Find notification recipients by application
     *
     * @param Application $application
     * @param $isTest
     * @return mixed
     */
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


    /**
     * Find device recipients by notification details
     *
     * @param PushNotification $notification
     * @param string $language
     * @param bool $isTest
     * @return mixed
     */
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


    /**
     * Find device recipients by notification details
     *
     * @param PushNotification $notification
     * @param array $excludeLanguages
     * @param $isTest
     * @return mixed
     */
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


    /**
     * Find devices without a firebase token
     *
     * @return mixed
     */
    public function findDevicesWithoutFirebaseToken()
    {
        return $this->createQueryBuilder('devices')
            ->select('devices.application, GROUP_CONCAT(devices.apnsToken)')
            ->andWhere('devices.firebaseToken IS NULL')
            ->groupBy('devices.application')
            ->getQuery()
            ->execute();
    }


    /**
     * Set devices disabled by expired or invalid tokens
     *
     * @param array $tokens
     * @return mixed
     */
    public function setDisabledByTokens(array $tokens)
    {
        return $this->createQueryBuilder('devices')->update()
            ->set('devices.tokenState', 0)
            ->where('devices.firebaseToken IN(:tokens)')
            ->setParameter('tokens', $tokens)
            ->getQuery()
            ->execute();
    }


    /**
     * Update a token
     *
     * @param $oldToken
     * @param $newToken
     * @return mixed
     */
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


    /**
     * Get devices which lack a firebase token
     *
     * @param Application $application
     * @return mixed
     */
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


    /**
     * Update a token
     *
     * @param int $applicationId
     * @param string $apnsToken
     * @param string $firebaseToken
     * @return mixed
     */
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
