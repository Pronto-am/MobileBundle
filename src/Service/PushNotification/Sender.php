<?php

namespace Pronto\MobileBundle\Service\PushNotification;

use Doctrine\ORM\EntityManagerInterface;
use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Exception\FirebaseException;
use Kreait\Firebase\Exception\MessagingException;
use Kreait\Firebase\Factory;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\Repository\DeviceRepository;
use Pronto\MobileBundle\Utils\Firebase\CloudMessaging\MessageGroup;
use Pronto\MobileBundle\Utils\Firebase\CloudMessaging\Response;

class Sender
{
    private array $devices = [];
    private ?Response $response;
    private Messaging $messaging;
    private PushNotification $notification;

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly FirebaseStorage $firebaseStorage
    ) {
    }

    public function setServiceAccount(
        array $serviceAccount
    ): self {
        $factory = new Factory();
        $this->messaging = $factory
            ->withServiceAccount($serviceAccount)
            ->createMessaging();

        return $this;
    }

    public function setNotification(
        PushNotification $notification
    ): self {
        $this->notification = $notification;
        return $this;
    }

    /**
     * @return array<MessageGroup>
     */
    private function getMessageGroups(): array
    {
        $application = $this->notification->getApplication();
        $messageGroups = $languages = [];

        /** @var DeviceRepository $deviceRepository */
        $deviceRepository = $this->entityManager->getRepository(Device::class);

        foreach ($application->getAvailableLanguages() as $language) {
            $languages[] = $language['code'];

            // Get the devices by notification details and language
            $devices = $deviceRepository->findNotificationRecipientsByLanguage(
                notification: $this->notification,
                language: $language['code'],
                isTest: $this->notification->getTest()
            );

            $this->devices = array_merge($this->devices, $devices);

            $messageGroups[] = new MessageGroup(
                notification: $this->notification,
                firebaseStorage: $this->firebaseStorage,
                devices: $devices,
                language: $language['code']
            );
        }

        // Create another message group of left-over devices
        $devices = $deviceRepository->findNotificationRecipientsByExcludeLanguages(
            notification: $this->notification,
            excludeLanguages: $languages,
            isTest: $this->notification->getTest()
        );

        $this->devices = array_merge($this->devices, $devices);

        $messageGroups[] = new MessageGroup(
            notification: $this->notification,
            firebaseStorage: $this->firebaseStorage,
            devices: $devices
        );

        return $messageGroups;
    }

    /**
     * @throws MessagingException
     * @throws FirebaseException
     */
    public function send(): void
    {
        $this->response = new Response();
        $messageGroups = $this->getMessageGroups();
        foreach ($messageGroups as $messageGroup) {

            $chunks = array_chunk($messageGroup->getTokens(), 1000);

            foreach ($chunks as $chunk) {
                $report = $this->messaging->sendMulticast(
                    message: $messageGroup->message,
                    registrationTokens: $chunk,
                );

                $this->response->addReport(
                    report: $report
                );
            }
        }

        $this->handleErrors();
        $this->saveStatistics();
    }

    /**
     * Handle the errors with the deletion or update of tokens
     */
    private function handleErrors(): void
    {
        if (count($this->getTokensToDelete()) > 0) {
            $this->entityManager->getRepository(Device::class)
                ->setDisabledByTokens($this->getTokensToDelete());
        }
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
     * Insert statistics for the sent push notification
     */
    private function saveStatistics(): void
    {
        // Insert the devices for statistics
        foreach ($this->devices as $device) {
            $recipient = new Recipient(
                pushNotification: $this->notification,
                device: $this->entityManager->getReference(Device::class, $device['id'])
            );

            // Check if there was an error sending to this specific device, and log it
            if (in_array($device['firebaseToken'], $this->getTokensToDelete())) {
                $recipient->setSent(false);

                $recipient->setDescription('Unknown failure');
            } elseif ($device['firebaseToken'] === null) {
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
        $logs[] = 'Tokens to delete: ' . json_encode($this->getTokensToDelete());

        return $logs;
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
}
