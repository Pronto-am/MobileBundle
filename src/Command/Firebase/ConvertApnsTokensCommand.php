<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Command\Firebase;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Repository\ApplicationRepository;
use Pronto\MobileBundle\Repository\DeviceRepository;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\PushNotification\ApnsTokenConverter;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ConvertApnsTokensCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly ApnsTokenConverter $apnsTokenConverter,
        private readonly ProntoMobile $prontoMobile,
        $name = null
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this->setName('firebase:tokens:convert')->setDescription('Convert APNS tokens to Firebase tokens');
    }

    /**
     * @throws ORMException
     * @throws GuzzleException
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        /** @var ApplicationRepository $applicationRepository */
        $applicationRepository = $this->entityManager->getRepository(Application::class);

        /** @var DeviceRepository $deviceRepository */
        $deviceRepository = $this->entityManager->getRepository(Device::class);

        // Select the applications which contain empty firebase tokens
        $applications = $applicationRepository->getWithMissingFirebaseTokens();

        // There are no tokens to convert, alert the user
        if (count($applications) === 0) {
            $output->writeln('No tokens to convert');
        }

        // Write a status to the console
        foreach ($applications as $application) {
            $output->writeln([
                '- Converting ' . $application['tokens'] . ' token(s) for application with bundle: ' . $application['ios_bundle_identifier'],
                ''
            ]);

            /** @var Application $referencedApplication */
            $referencedApplication = $this->entityManager->getReference(Application::class, $application['id']);

            // Get the devices with a missing firebase token
            $devices = $deviceRepository->getByMissingFirebaseToken($referencedApplication);

            try {
                // Get the configuration of the push notifications plugin
                $config = $this->prontoMobile->getPluginConfiguration(Plugin::PUSH_NOTIFICATIONS, (int)$application['id']);

                $serviceAccountString = $config[Plugin::PUSH_NOTIFICATIONS_FIREBASE_SERVICE_ACCOUNT];
                if (!is_string($serviceAccountString)) {
                    $output->writeln('Firebase Service Account is invalid');
                    continue;
                }

                $serviceAccount = json_decode($serviceAccountString, true);
                if (!is_array($serviceAccount) || json_last_error() !== JSON_ERROR_NONE) {
                    $output->writeln('Firebase Service Account is invalid');
                    continue;
                }

                // Set the necessary information
                $this->apnsTokenConverter->setBundle($application['ios_bundle_identifier']);
                $this->apnsTokenConverter->setServiceAccount($serviceAccount);
                $this->apnsTokenConverter->setDevices($devices);

                $results = $this->apnsTokenConverter->convert();

            } catch (Exception $exception) {

                // Something went wrong, output it and continue with the rest of the plugins
                $output->writeln([' - Error converting the tokens', ' - E:' . $exception->getMessage()]);

                continue;
            }

            // Firebase encountered an error when converting apns tokens
            if ($results === false) {
                $output->writeln([
                    'Could not convert tokens for this application. Check if the access key is correct and the ios bundle identifier is provided.',
                    ''
                ]);

                continue;
            }

            // Loop through the results and add the firebase tokens to the apns tokens
            foreach ($results as $result) {
                if ($result['status'] === 'OK') {
                    $deviceRepository->addFirebaseToken(
                        applicationId: $application['id'],
                        apnsToken: $result['apns_token'],
                        firebaseToken: $result['registration_token'],
                    );
                }
            }
        }

        return Command::SUCCESS;
    }
}
