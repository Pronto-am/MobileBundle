<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Command\Firebase;

use DateTime;
use DateTimeZone;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Kreait\Firebase\Exception\DatabaseException;
use Kreait\Firebase\Factory;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\PushNotification\GoogleServiceAccountLoader;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class RetrieveLogsCommand extends Command
{
    // Table logging constants
    public const LOG_TABLE_NAME = 'pronto_logs';
    public const TYPE_SIGN_IN_USERS = 'sign_in_users';
    public const TYPE_SIGN_IN_DEVICES = 'sign_in_devices';
    public const TYPE_NOTIFICATION_OPENED = 'notification_opened';

    // Decryption method for the table contents
    public const DECRYPTION_METHOD = 'aes-256-cbc';

    private ProntoMobile $prontoMobile;

    private OutputInterface $output;

    public function __construct(
        readonly EntityManagerInterface $entityManager,
        readonly GoogleServiceAccountLoader $googleServiceAccountLoader,
        ContainerInterface $container, $name = null
    ) {
        $this->prontoMobile = $container->get(ProntoMobile::class);

        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this->setName('firebase:database:logs')
            ->setDescription('Retrieve the app logins from the Firebase database')
            ->setHelp('Retrieve the app logins from the Firebase database');
    }

    /**
     * @throws Exception
     * @throws DatabaseException
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->output = $output;

        try {
            $serviceAccount = $this->googleServiceAccountLoader->fromFile();
        } catch (Exception $exception) {
            $output->writeln([
                'Could not create a service account from the provided file. More information is provided below:',
                'E: ' . $exception->getMessage()
            ]);

            return Command::FAILURE;
        }

        $output->writeln('- Creating the connection with Firebase');

        $factory = new Factory();

        $firebase = $factory->withServiceAccount($serviceAccount);
        $database = $firebase->createDatabase()->getReference(self::LOG_TABLE_NAME);
        $snapshot = $database->getSnapshot();

        $output->writeln('- Accessing the logs database');

        // Empty the database immediately after the retrieval of the data
        $database->remove();

        // Check if the snapshot has values
        if ($snapshot->getValue() === null) {
            $output->writeln(' - There are no logs to retrieve');
            return Command::SUCCESS;
        }

        $output->writeln('- Looping through all of the logged records');

        // Loop through the data
        foreach ($snapshot->getValue() as $value) {
            if (!is_array($value)) {
                $output->writeln(['<error>Value is not an array, skipping</error>']);
                continue;
            }

            try {
                $configuration = $this->prontoMobile->getConfiguration('firebase');
                $decryptionPassword = $configuration['storage_decryption_password'];

                $data = openssl_decrypt(
                    data: $value['data'],
                    cipher_algo: self::DECRYPTION_METHOD,
                    passphrase: $decryptionPassword,
                    iv: $value['iv']
                );

            } catch (Exception $exception) {
                $output->writeln([
                    'Could not decrypt this data: ' . $value['data'],
                    'E: ' . $exception->getMessage()
                ]);

                continue;
            }

            if ($data === false) {
                $output->writeln(['<error>Data could not be decrypted</error>']);
                continue;
            }

            $data = json_decode($data);

            // Parse the date to the correct timezone
            $date = new DateTime($value['date']);
            $date->setTimezone(new DateTimeZone('Europe/Amsterdam'));

            switch ($value['type']) {
                case self::TYPE_SIGN_IN_DEVICES:
                    $output->writeln(' - Saving a device sign in log record');

                    $this->insertDeviceSignIn($data, $date);

                    break;
                case self::TYPE_SIGN_IN_USERS:
                    $output->writeln(' - Saving a user sign in log record');

                    $this->insertUserSignIn($data, $date);

                    break;
                case self::TYPE_NOTIFICATION_OPENED:
                    $output->writeln(' - Saving an opened notification record');

                    $this->logOpenedNotification($data, $date);

                    break;
            }
        }

        // Save the changes to all records to the database
        $this->entityManager->flush();
        return Command::SUCCESS;
    }

    private function insertDeviceSignIn($data, $date): void
    {
        // Put code inside try catch to prevent crashing the cronjob
        try {
            /** @var Device $device */
            $device = $this->entityManager->getRepository(Device::class)
                ->find($data->device_identifier);

            if ($device === null) {
                return;
            }

            // Check if we need to update the firebase token
            if (isset($data->firebase_token) && $data->firebase_token !== $device->getFirebaseToken()) {
                $device->setFirebaseToken($data->firebase_token);

                // Reset the token state, in case the token has been marked as invalid
                $device->setTokenState(true);
            }

            // Check if we need to update the apns and thus also firebase token
            if (isset($data->apns_token) && $data->apns_token !== $device->getApnsToken()) {
                $device->setApnsToken($data->apns_token);

                // Set the firebase token to null, so that it will be updated by the cronjob that's running
                $device->setFirebaseToken(null);

                // Reset the token state, in case the token has been marked as invalid
                $device->setTokenState(true);
            }

            $device->setLastLogin($date);
            $device->setOsVersion($data->os_version);
            $device->setAppVersion($data->app_version);
            $device->setLanguage($data->language);
            $device->setExtraData($data->extra_data ?? null);

            $this->entityManager->persist($device);

        } catch (Exception $exception) {
            $this->output->writeln([' - Error saving the device sign in record:', ' - E: ' . $exception->getMessage()]);

            return;
        }
    }

    private function insertUserSignIn($data, $date): void
    {
        // Put code inside try catch to prevent crashing the cronjob
        try {
            $user = $this->entityManager->getRepository(AppUser::class)
                ->find($data->user_identifier);

            if (!$user instanceof AppUser) {
                return;
            }

            $user->setLastLogin($date);
            $this->entityManager->persist($user);

        } catch (Exception $exception) {
            $this->output->writeln([' - Error saving the user sign in record:', ' - E: ' . $exception->getMessage()]);

            return;
        }
    }

    private function logOpenedNotification($data, $date): void
    {
        // Put code inside try catch to prevent crashing the cronjob
        try {
            $notificationRecipient = $this->entityManager->getRepository(Recipient::class)->findOneBy([
                'pushNotification' => $data->notification_identifier,
                'device'           => $data->device_identifier
            ]);

            // Check if the recipient exists
            if (!$notificationRecipient instanceof Recipient) {
                return;
            }

            // Save the notification as opened
            $notificationRecipient->setOpened($date);

            $this->entityManager->persist($notificationRecipient);

        } catch (Exception $exception) {
            $this->output->writeln([' - Error saving the status record:', ' - E: ' . $exception->getMessage()]);

            return;
        }
    }
}
