<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Command;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use League\Bundle\OAuth2ServerBundle\Manager\ClientManagerInterface;
use League\Bundle\OAuth2ServerBundle\Model\Client;
use League\Bundle\OAuth2ServerBundle\ValueObject\Grant;
use Pronto\MobileBundle\Entity\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class UpgradeCommand extends Command
{
    private const ASSISTABLE_VERSIONS = ['2.0.0'];

    private EntityManagerInterface $entityManager;
    private ClientManagerInterface $clientManager;

    public function __construct(ClientManagerInterface $clientManager, EntityManagerInterface $entityManager, $name = null)
    {
        parent::__construct($name);
        $this->entityManager = $entityManager;
        $this->clientManager = $clientManager;
    }

    protected function configure()
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

        // Version for now is only 2.0.0
        $this->migrateOAuthClients();

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
}
