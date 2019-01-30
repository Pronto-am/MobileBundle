<?php

namespace Pronto\MobileBundle\Command\Firebase;


use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\PushNotification\ApnsTokenConverter;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ConvertApnsTokensCommand extends Command
{
	/** @var EntityManagerInterface $entityManager */
	private $entityManager;

	/** @var ApnsTokenConverter $apnsTokenConverter */
	private $apnsTokenConverter;

	/** @var ProntoMobile $prontoMobile */
	private $prontoMobile;


	/**
	 * ConvertApnsTokensCommand constructor.
	 * @param EntityManagerInterface $entityManager
	 * @param ProntoMobile $prontoMobile
	 * @param ApnsTokenConverter $apnsTokenConverter
	 * @param null $name
	 */
	public function __construct(EntityManagerInterface $entityManager, ProntoMobile $prontoMobile, ApnsTokenConverter $apnsTokenConverter, $name = null)
	{
		$this->entityManager = $entityManager;
		$this->apnsTokenConverter = $apnsTokenConverter;
		$this->prontoMobile = $prontoMobile;

		parent::__construct($name);
	}


	/**
	 * Configure the command
	 */
	protected function configure(): void
	{
		$this->setName('firebase:tokens:convert')->setDescription('Convert APNS tokens to Firebase tokens');
	}


	/**
	 * Execute the command
	 *
	 * @param InputInterface $input
	 * @param OutputInterface $output
	 * @return int|null|void
	 * @throws \Doctrine\ORM\ORMException
	 */
	protected function execute(InputInterface $input, OutputInterface $output)
	{
		// Retrieve the tokens as GROUP_CONCAT, with application ID and bundle identifiers. This query has less impact than a repository query.
		//$applications = $this->connection->query('SELECT a.id, a.ios_bundle_identifier, GROUP_CONCAT(d.apns_token) AS tokens FROM devices d LEFT JOIN applications a ON a.id = d.application_id WHERE firebase_token IS NULL OR firebase_token = \'\' GROUP BY d.application_id LIMIT 100')->fetchAll();

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
				$config = $this->prontoMobile->getPluginConfiguration(Plugin::PUSH_NOTIFICATIONS, $application['id']);

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
			if (is_bool($results) && $results === false) {
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