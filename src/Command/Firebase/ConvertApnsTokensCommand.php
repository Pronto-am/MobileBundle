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
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\PushNotification\ApnsTokenConverter;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ConvertApnsTokensCommand extends Command
{
    private EntityManagerInterface $entityManager;

    private ApnsTokenConverter $apnsTokenConverter;

    private ProntoMobile $prontoMobile;

    public function __construct(
        EntityManagerInterface $entityManager,
        ContainerInterface     $container,
        ApnsTokenConverter     $apnsTokenConverter,
                               $name = null
    ) {
        $this->entityManager = $entityManager;
        $this->apnsTokenConverter = $apnsTokenConverter;
        $this->prontoMobile = $container->get(ProntoMobile::class);

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
        // Select the applications which contain empty firebase tokens
        $applications = $this->entityManager->getRepository(Application::class)->getWithMissingFirebaseTokens();

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
            $devices = $this->entityManager->getRepository(Device::class)->getByMissingFirebaseToken($referencedApplication);

            try {
                // Get the configuration of the push notifications plugin
                $config = $this->prontoMobile->getPluginConfiguration(Plugin::PUSH_NOTIFICATIONS, (int)$application['id']);

                // Set the necessary information
                $this->apnsTokenConverter->setBundle($application['ios_bundle_identifier']);
                $this->apnsTokenConverter->setServerKey($config[Plugin::PUSH_NOTIFICATIONS_FIREBASE_TOKEN]);
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
                if ($result->status === 'OK') {
                    $this->entityManager->getRepository(Device::class)->addFirebaseToken($application['id'], $result->apns_token, $result->registration_token);
                }
            }
        }
    }
}
