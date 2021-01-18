<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Command;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Entity\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Trikoder\Bundle\OAuth2Bundle\Model\Client;
use Trikoder\Bundle\OAuth2Bundle\Model\Grant;

class UpgradeCommand extends Command
{
    private const ASSISTABLE_VERSIONS = ['2.0.0'];

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager, $name = null)
    {
        parent::__construct($name);
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this->setName('pronto:upgrade:assist')
            ->addArgument('version', InputArgument::REQUIRED, 'The version you are updating to')
            ->setDescription('Run actions needed when upgrading to a specific version')
            ->setHelp('Run actions needed when upgrading to a specific version');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $version = $input->getArgument('version');
        $outputStyle = new SymfonyStyle($input, $output);

        if (!in_array($version, self::ASSISTABLE_VERSIONS)) {
            $outputStyle->error('We can only assist when upgrading to one of: [' . implode(', ', self::ASSISTABLE_VERSIONS) . ']');
            return;
        }

        // Version for now is only 2.0.0
        $this->migrateOAuthClients();
    }

    private function migrateOAuthClients(): void
    {
        /** @var ArrayCollection $applications */
        $applications = $this->entityManager->getRepository(Application::class)->findAll();
        $applications->filter(static function (Application $application) {
            return $application->getApplicationClients()->isEmpty();
        });

        /** @var Application $application */
        foreach ($applications as $application) {
            $client = new Client(
                $this->createIdentifier(),
                $application->getSecret()
            );

            $client->setGrants(...$this->createGrantTypes());
            $client->setActive(true);

            $this->entityManager->persist($client);

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
