<?php

namespace Pronto\MobileBundle\Service\PushNotification;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\Utils\Firebase\CloudMessaging\Client;
use Pronto\MobileBundle\Utils\Firebase\CloudMessaging\MessageGroup;
use Pronto\MobileBundle\Utils\Firebase\CloudMessaging\Response;

class Sender
{
	/** @var Client */
	private $client;

	/** @var array */
	private $devices = [];

	/** @var Response */
	private $response;

	/** @var EntityManagerInterface */
	private $entityManager;

	/** @var PushNotification */
	private $notification;

    /** @var FirebaseStorage */
    private $firebaseStorage;

	public function __construct(EntityManagerInterface $entityManager, FirebaseStorage $firebaseStorage)
	{
		$this->entityManager = $entityManager;
        $this->firebaseStorage = $firebaseStorage;
    }

	public function setServerKey(string $firebaseServerKey): bool
	{
		try {
			$this->client = new Client($firebaseServerKey);
		} catch (Exception $e) {
			$this->client = false;
		}

		return $this->client !== false;
	}

	public function setNotification(PushNotification $notification): void
	{
		$this->notification = $notification;

		$this->setMessageGroups();
	}

	private function setMessageGroups(): void
	{
		$application = $this->notification->getApplication();
		$messageGroups = $languages = [];

		foreach ($application->getAvailableLanguages() as $language) {
			$languages[] = $language['code'];

			// Get the devices by notification details and language
			$devices = $this->entityManager->getRepository(Device::class)->findNotificationRecipientsByLanguage($this->notification, $language['code'], $this->notification->getTest());

			$this->devices = array_merge($this->devices, $devices);

			$messageGroups[] = new MessageGroup($this->notification, $this->firebaseStorage, $devices, $language['code']);
		}

		// Create another message group of left-over devices
		$devices = $this->entityManager->getRepository(Device::class)->findNotificationRecipientsByExcludeLanguages($this->notification, $languages, $this->notification->getTest());

		$this->devices = array_merge($this->devices, $devices);

		$messageGroups[] = new MessageGroup($this->notification, $this->firebaseStorage, $devices);

		$this->client->setMessageGroups($messageGroups);
	}

	/**
	 * Send the message to the Firebase cloud messaging API
	 */
	public function send(): void
	{
		try {
			$this->response = $this->client->sendNotification();
		} catch (Exception $exception) {
			// dump($exception); die;
		}

		$this->handleErrors();

		$this->saveStatistics();
	}

	/**
	 * Get the expired tokens
	 *
	 * @return array
	 */
	public function getTokensToDelete(): array
	{
		if ($this->response !== null) {
			return $this->response->getTokensToDelete();
		}

		return [];
	}

	/**
	 * Get updated tokens
	 *
	 * @return array
	 */
	public function getTokensToModify(): array
	{
		if ($this->response !== null) {
			return $this->response->getTokensToModify();
		}

		return [];
	}

	/**
	 * Get the tokens that need a new attempt at sending the notification
	 *
	 * @return array
	 */
	public function getTokensToRetry(): array
	{
		if ($this->response !== null) {
			return $this->response->getTokensToRetry();
		}

		return [];
	}

	/**
	 * Get the success count of the push notification
	 *
	 * @return int
	 */
	public function getSuccessCount(): int
	{
		if ($this->response !== null) {
			return $this->response->getSuccessCount();
		}

		return 0;
	}

	/**
	 * Get the failure count of the push notification
	 *
	 * @return int
	 */
	public function getFailureCount(): int
	{
		if ($this->response !== null) {
			return $this->response->getFailureCount();
		}

		return 0;
	}

	/**
	 * Get the modify count of the push notification
	 *
	 * @return int
	 */
	public function getModifyCount(): int
	{
		if ($this->response !== null) {
			return $this->response->getModifyCount();
		}

		return 0;
	}

	/**
	 * Get the failure reasons if the response is set
	 *
	 * @return array
	 */
	public function getFailureReasons(): array
	{
		if ($this->response !== null) {
			return $this->response->getFailureReasons();
		}

		return [];
	}

	/**
	 * Handle the errors with the deletion or update of tokens
	 */
	private function handleErrors(): void
	{
		if (count($this->getTokensToDelete()) > 0) {
			// Delete old tokens
			$this->entityManager->getRepository(Device::class)->setDisabledByTokens($this->getTokensToDelete());
		}

		// Update new tokens
		foreach ($this->getTokensToModify() as $oldToken => $newToken) {
			$this->entityManager->getRepository(Device::class)->updateToken($oldToken, $newToken);
		}
	}

	/**
	 * Insert statistics for the sent push notification
	 */
	private function saveStatistics(): void
	{
		// Insert the devices for statistics
		foreach ($this->devices as $device) {
			$recipient = new Recipient($this->notification, $this->entityManager->getReference(Device::class, $device['id']));

			// Check if there was an error sending to this specific device, and log it
			if (in_array($device['firebaseToken'], $this->getTokensToDelete()) || in_array($device['firebaseToken'], $this->getTokensToRetry())) {
				$recipient->setSent(false);

				$reasons = $this->getFailureReasons();

				$recipient->setDescription(isset($reasons[$device['firebaseToken']]) ? strtolower($reasons[$device['firebaseToken']]) : 'Unknown failure');
			} elseif($device['firebaseToken'] === null) {
				$recipient->setSent(false);
				$recipient->setDescription('nofirebasetoken');
			}

			$this->entityManager->persist($recipient);
		}

		$this->devices = [];

		$this->entityManager->flush();
	}

	/**
	 * Display logging of the sent push notification
	 *
	 * @return array
	 */
	public function getLogging(): array
	{
		$logs = [];

		$logs[] = 'Successful: ' . $this->getSuccessCount();
		$logs[] = 'Failures: ' . $this->getFailureCount();
		$logs[] = 'Modified: ' . $this->getModifyCount();
		$logs[] = 'Tokens to retry: ' . json_encode($this->getTokensToRetry());
		$logs[] = 'Tokens to modify: ' . json_encode(array_keys($this->getTokensToModify()));
		$logs[] = 'Tokens to delete: ' . json_encode($this->getTokensToDelete());

		return $logs;
	}
}
