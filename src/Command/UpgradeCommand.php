<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Command;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use League\Bundle\OAuth2ServerBundle\Manager\ClientManagerInterface;
use League\Bundle\OAuth2ServerBundle\Model\Client;
use League\Bundle\OAuth2ServerBundle\ValueObject\Grant;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Plugin;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class UpgradeCommand extends Command
{
    private const VERSION_2_0_0 = '2.0.0';
    private const VERSION_3_0_0 = '3.0.0';

    private const ASSISTABLE_VERSIONS = [self::VERSION_2_0_0, self::VERSION_3_0_0];

    public function __construct(
        readonly ClientManagerInterface $clientManager,
        readonly EntityManagerInterface $entityManager,
        $name = null
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this->setName('pronto:upgrade:assist')
            ->addArgument('version', InputArgument::REQUIRED, 'The version you are updating to')
            ->setDescription('Run actions needed when upgrading to a specific version')
            ->setHelp('Run actions needed when upgrading to a specific version');
    }

    /**
     * @throws Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $version = $input->getArgument('version');
        $outputStyle = new SymfonyStyle($input, $output);

        if (!in_array($version, self::ASSISTABLE_VERSIONS)) {
            $outputStyle->error('We can only assist when upgrading to one of: [' . implode(', ', self::ASSISTABLE_VERSIONS) . ']');
            return Command::INVALID;
        }

        if ($version === self::VERSION_2_0_0) {
            $this->migrateOAuthClients();

        } else if ($version === self::VERSION_3_0_0) {
            try {

                // Delete access tokens table
                $this->truncateAccessTokensTable();
            } catch (Exception $exception) {
                $outputStyle->warning('Unable to truncate access tokens: ' . $exception->getMessage());
            }

            // Update plugin configuration
            $this->updatePluginConfiguration();
        }

        return Command::SUCCESS;
    }

    /**
     * @throws Exception
     */
    private function migrateOAuthClients(): void
    {
        $applications = $this->entityManager->getRepository(Application::class)->findAll();
        $applications = array_filter($applications, static function (Application $application) {
            return $application->getApplicationClients()->isEmpty();
        });

        /** @var Application $application */
        foreach ($applications as $application) {
            $client = new Client(
                $application->getName() . ' Client',
                $this->createIdentifier(),
                $application->getSecret()
            );

            $client->setGrants(...$this->createGrantTypes());
            $client->setActive(true);

            $this->clientManager->save($client);

            $applicationClient = new Application\ApplicationClient($application, $client, 'Default');
            $this->entityManager->persist($applicationClient);
        }

        $this->entityManager->flush();
    }

    /**
     * @throws Exception
     */
    private function createIdentifier(): string
    {
        return hash('md5', random_bytes(16));
    }

    private function createGrantTypes(): array
    {
        return [
            new Grant('client_credentials'),
            new Grant('password'),
            new Grant('refresh_token')
        ];
    }

    private function truncateAccessTokensTable(): void
    {
        $connection = $this->entityManager->getConnection();
        $platform = $connection->getDatabasePlatform();

        $truncateSql = $platform->getTruncateTableSQL('access_tokens');
        $connection->executeQuery($truncateSql);
    }

    private function updatePluginConfiguration(): void
    {
        $pluginRepository = $this->entityManager->getRepository(Plugin::class);
        $plugin = $pluginRepository->findOneBy([
            'identifier' => Plugin::PUSH_NOTIFICATIONS,
        ]);

        $config = $plugin->getDefaultConfig();

        if (isset($config[Plugin::PUSH_NOTIFICATIONS_FIREBASE_SERVICE_ACCOUNT])) {
            return;
        }

        $config[Plugin::PUSH_NOTIFICATIONS_FIREBASE_SERVICE_ACCOUNT] = $config['firebaseAccessToken'];
        unset($config['firebaseAccessToken']);

        $plugin->setDefaultConfig($config);
        $this->entityManager->persist($plugin);
        $this->entityManager->flush();
    }
}