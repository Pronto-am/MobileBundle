<?php

namespace Pronto\MobileBundle\Command\Deployment;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\Client;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\RefreshToken;
use Pronto\MobileBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpKernel\KernelInterface;

class MigrateCommand extends Command
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * @var KernelInterface $kernel
     */
    private $kernel;

    // Local backups
    private $accessTokenUserCombinations = [];
    private $refreshTokenUserCombinations = [];
    private $userMapping = [];
    private $deviceMapping = [];

    /**
     * MigrateAppUsersCommand constructor.
     * @param EntityManagerInterface $entityManager
     * @param KernelInterface $kernel
     * @param null $name
     */
    public function __construct(EntityManagerInterface $entityManager, KernelInterface $kernel, $name = null)
    {
        $this->entityManager = $entityManager;
        $this->kernel = $kernel;

        parent::__construct($name);
    }

    /**
     * Configure the command
     */
    protected function configure(): void
    {
        $this->setName('deployment:migrate')->setDescription('Migrate after an upgrade');
    }

    /**
     * Execute the command
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeLn(['Backup devices', '']);
        $this->backupDevices();

        $output->writeLn(['Creating a backup of the tokens', '']);
        $this->backupTokens();

        die;

        $output->writeLn(['Force updating the schema', '']);
        $this->schemaUpdate();

        $output->writeLn(['Creating OAuth clients', '']);
        $this->createOAuthClients();

        $output->writeLn(['Migrating the users', '']);

        // Migrate app users to users table
        $appUsers = $this->entityManager->getRepository(AppUser::class)->findAll();

        foreach ($appUsers as $appUser) {
            $user = new User();
            $user->setFormerAppUser($appUser);
            $user->setActivated($appUser->getActivated());
            $user->setActivationToken($appUser->getActivationToken());
            $user->setApplication($appUser->getApplication());
            $user->setCreatedAt($appUser->getCreatedAt());
            $user->setCustomer($appUser->getApplication()->getCustomer());
            $user->setEmail($appUser->getEmail());
            $user->setFirstName($appUser->getFirstName());
            $user->setLastName($appUser->getLastName());
            $user->setExtraData($appUser->getExtraData());
            $user->setLastLogin($appUser->getLastLogin());
            $user->setRoles(['ROLE_APP_USER']);
            $user->setPassword($appUser->getPassword());
            $user->setUpdatedAt($appUser->getUpdatedAt());
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            /** @var Device $device */
            foreach ($appUser->getDevices() as $device) {
                $device->setUser($user);
            }

            $this->userMapping[$appUser->getId()] = $user;
        }

        file_put_contents('users.json', json_encode($this->userMapping));

        $output->writeLn(['Reattaching the access tokens to the new user', '']);

        $accessTokens = $this->entityManager->getRepository(AccessToken::class)->findBy(['id' => array_keys($this->accessTokenUserCombinations)]);

        /** @var AccessToken $accessToken */
        foreach ($accessTokens as $accessToken) {
            if ($user = $this->userMapping[$this->accessTokenUserCombinations[$accessToken->getId()]]) {
                $accessToken->setUser($user);
            }
        }

        $output->writeLn(['Reattaching the refresh tokens to the new user', '']);

        $refreshTokens = $this->entityManager->getRepository(RefreshToken::class)->findBy(['id' => array_keys($this->refreshTokenUserCombinations)]);

        /** @var RefreshToken $refreshToken */
        foreach ($refreshTokens as $refreshToken) {
            if ($user = $this->userMapping[$this->refreshTokenUserCombinations[$refreshToken->getId()]]) {
                $refreshToken->setUser($user);
            }
        }

        $output->writeLn(['Reattaching devices to the new user', '']);

        $devices = $this->entityManager->getRepository(Device::class)->findBy(['id' => array_keys($this->deviceMapping)]);

        /** @var Device $device */
        foreach ($devices as $device) {
            if ($user = $this->userMapping[$this->deviceMapping[$device->getId()]]) {
                $refreshToken->setUser($user);
            }
        }
    }

    private function createOAuthClients()
    {
        $applications = $this->entityManager->getRepository(\Pronto\MobileBundle\Entity\Application::class)->findAll();

        foreach ($applications as $application) {
            $client = new Client();
            $client->setId($application->getId());
            $client->setRandomId($application->getRandomId());
            $client->setApplication($application);
            $client->setAllowedGrantTypes($application->getAllowedGrantTypes());
            $client->setRedirectUris($application->getRedirectUris());
            $client->setSecret($application->getSecret());
            $this->entityManager->persist($client);
        }

        $this->entityManager->flush();
    }

    /**
     * @throws \Exception
     */
    private function schemaUpdate()
    {
        $application = new Application($this->kernel);
        $application->setAutoExit(false);

        $input = new ArrayInput([
            'command' => 'doctrine:schema:update',
            // (optional) define the value of command arguments
            '--force' => true,
        ]);

        // You can use NullOutput() if you don't need the output
        $output = new BufferedOutput();
        $application->run($input, $output);
    }

    private function backupTokens()
    {
        // Save all access token / user combinations locally
        $accessTokens = $this->entityManager->getRepository(AccessToken::class)->findAll();

        foreach ($accessTokens as $accessToken) {
            if ($accessToken->getUser() === null) {
                continue;
            }

            dump($accessToken->getUser());
            $this->accessTokenUserCombinations[$accessToken->getId()] = $accessToken->getUser()->getId();
            $accessToken->setUser(null);
            $this->entityManager->persist($accessToken);
        }

        dump($this->accessTokenUserCombinations);die;
        file_put_contents('/Users/thomasroovers/Developer/Sites/pronto.dev/access_tokens.json', json_encode($this->accessTokenUserCombinations));

        // Save all refresh token / user combinations locally
        $refreshTokens = $this->entityManager->getRepository(RefreshToken::class)->findAll();

        foreach ($refreshTokens as $refreshToken) {
            if ($refreshToken->getUser() === null) {
                continue;
            }

            $this->refreshTokenUserCombinations[$refreshToken->getId()] = $refreshToken->getUser()->getId();
            $refreshToken->setUser(null);
            $this->entityManager->persist($refreshToken);
        }

        $this->entityManager->flush();
        file_put_contents('/Users/thomasroovers/Developer/Sites/pronto.dev/refresh_tokens.json', json_encode($this->refreshTokenUserCombinations));
    }

    private function backupDevices() {
        // Save all device / user combinations locally
        $devices = $this->entityManager->getRepository(Device::class)->findAll();

        foreach ($devices as $device) {
            if ($device->getUser() === null) {
                continue;
            }

            $this->deviceMapping[$device->getId()] = $device->getUser()->getId();
            $device->setUser(null);
            $this->entityManager->persist($device);
        }

        $this->entityManager->flush();
        file_put_contents('/Users/thomasroovers/Developer/Sites/pronto.dev/devices.json', json_encode($this->deviceMapping));
    }
}
