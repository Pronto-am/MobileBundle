<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Doctrine\ORM\EntityRepository;

class DeviceRepository extends EntityRepository
{
	/**
	 * Find notification recipients by application
	 *
	 * @param Application $application
	 * @param $isTest
	 * @return mixed
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 */
	public function findRecipientsCountByApplication(Application $application, $isTest = false)
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
	public function findRecipientsByApplication(Application $application, $isTest)
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
	 * @param $isTest
	 * @return mixed
	 */
	public function findNotificationRecipientsByLanguage(PushNotification $notification, $language, $isTest)
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
	public function findNotificationRecipientsByExcludeLanguages(PushNotification $notification, array $excludeLanguages, $isTest)
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
	 * @return \Doctrine\ORM\QueryBuilder
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
	 * @return \Doctrine\ORM\QueryBuilder
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
	public function getByMissingFirebaseToken(Application $application) {
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
	 * @param $applicationId
	 * @param $apnsToken
	 * @param $firebaseToken
	 * @return \Doctrine\ORM\QueryBuilder
	 */
	public function addFirebaseToken($applicationId, $apnsToken, $firebaseToken)
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