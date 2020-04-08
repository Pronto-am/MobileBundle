<?php

namespace Pronto\MobileBundle\Command\Deployment;


use Doctrine\ORM\EntityManagerInterface;
use FOS\OAuthServerBundle\Model\ClientManager;
use FOS\OAuthServerBundle\Model\ClientManagerInterface;
use Pronto\MobileBundle\Entity\AccessToken;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\OAuthClient;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\RefreshToken;
use Pronto\MobileBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;

class MigrateCommand extends Command
{
    /**
     * @var ContainerInterface $container
     */
    private $container;

    /**
     * @var ClientManager $clientManager
     */
    private $clientManager;

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
     * MigrateCommand constructor.
     * @param EntityManagerInterface $entityManager
     * @param KernelInterface $kernel
     * @param ClientManagerInterface $clientManager
     * @param ContainerInterface $container
     * @param null $name
     */
    public function __construct(EntityManagerInterface $entityManager, KernelInterface $kernel, ClientManagerInterface $clientManager, ContainerInterface $container, $name = null)
    {
        $this->clientManager = $clientManager;
        $this->container = $container;
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
        // Add the user_id column to the devices table
//        $statement = $this->entityManager->getConnection()->prepare('ALTER TABLE devices ADD COLUMN user_id INT AFTER app_user_id');
//        $statement->execute();
//
//        $output->writeLn(['Backup devices and access/refresh tokens', '']);
//        $this->backup();
//
//        $output->writeLn(['Force updating the schema', '']);
//        $this->schemaUpdate();
//
//        $output->writeLn(['Creating OAuth clients', '']);
//        $this->createOAuthClients();
//
//        // Set all users to active
//        $output->writeLn(['Activating current user accounts', '']);
//        $this->activateUserAccounts();
//
//        $output->writeLn(['Migrating the users', '']);
//        $this->migrateAppUsers();
//
//        $output->writeLn(['Reattaching the access tokens to the new user', '']);
//
//        $accessTokens = $this->entityManager->getRepository(AccessToken::class)->findBy(['id' => array_keys($this->accessTokenUserCombinations)]);
//
//        /** @var AccessToken $accessToken */
//        foreach ($accessTokens as $accessToken) {
//            if ($user = $this->userMapping[$this->accessTokenUserCombinations[$accessToken->getId()]]) {
//                $accessToken->setUser($user);
//            }
//        }
//
//        $output->writeLn(['Reattaching the refresh tokens to the new user', '']);
//
//        $refreshTokens = $this->entityManager->getRepository(RefreshToken::class)->findBy(['id' => array_keys($this->refreshTokenUserCombinations)]);
//
//        /** @var RefreshToken $refreshToken */
//        foreach ($refreshTokens as $refreshToken) {
//            if ($user = $this->userMapping[$this->refreshTokenUserCombinations[$refreshToken->getId()]]) {
//                $refreshToken->setUser($user);
//            }
//        }
//
//        $output->writeLn(['Reattaching devices to the new user', '']);
//
//        $devices = $this->entityManager->getRepository(Device::class)->findBy(['id' => array_keys($this->deviceMapping)]);
//
//        /** @var Device $device */
//        foreach ($devices as $device) {
//            if ($user = $this->userMapping[$this->deviceMapping[$device->getId()]]) {
//                $refreshToken->setUser($user);
//            }
//        }
//
//        $this->entityManager->flush();

        // Update colors
        $output->writeLn(['Updating colors of applications', '']);
        $this->updateApplicationColors();
    }

    private function migrateAppUsers()
    {
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
    }

    private function activateUserAccounts()
    {
        // Migrate app users to users table
        $users = $this->entityManager->getRepository(User::class)->findAll();

        foreach ($users as $user) {
            $user->setActivated(true);
            $this->entityManager->persist($user);
        }

        $this->entityManager->flush();
    }

    private function createOAuthClients()
    {
        $applications = $this->entityManager->getRepository(\Pronto\MobileBundle\Entity\Application::class)->findAll();

        $autoIncrement = 0;

        foreach ($applications as $application) {
            // ID is going to be:
            $autoIncrement++;

            // To make sure the ID of the client is the same as the ID of the application, to preserve client ID's
            while ($autoIncrement < $application->getId()) {
                $autoIncrement++;
                $client = $this->clientManager->createClient();
                $this->entityManager->persist($client);
            }

            $client = new OAuthClient();
            $client->setId($application->getId());
            $client->setRandomId($application->getRandomId());
            $client->setApplication($application);
            $client->setAllowedGrantTypes($application->getAllowedGrantTypes());
            $client->setRedirectUris($application->getRedirectUris());
            $client->setSecret($application->getSecret());
            $this->entityManager->persist($client);

            $autoIncrement = $client->getId();
        }

        $this->entityManager->flush();

        // Delete the clients without application ID
        $clients = $this->entityManager->getRepository(OAuthClient::class)->findAll();

        foreach ($clients as $client) {
            if ($client->getApplication() === null) {
                $this->entityManager->remove($client);
            }
        }

        $this->entityManager->flush();

        $client = $this->clientManager->createClient();
        $client->setRedirectUris(['https://pronto.am']);
        $client->setAllowedGrantTypes(['token', 'authorization_code', 'refresh_token', 'password', 'client_credentials']);
        $this->clientManager->updateClient($client);

        $this->entityManager->flush();
    }

    /**
     * @throws \Exception
     */
    private function schemaUpdate()
    {
        $this->entityManager->getConnection()->executeQuery('SET FOREIGN_KEY_CHECKS=0;');

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

        $this->entityManager->getConnection()->executeQuery('SET FOREIGN_KEY_CHECKS=1;');
    }

    /**
     * Backup existing records of this app user
     */
    private function backup()
    {
        // Save all access token / user combinations locally
        $accessTokens = $this->entityManager->getRepository(AccessToken::class)->findAll();

        $appUsers = $this->entityManager->getRepository(AppUser::class)->findAll();

        /** @var AppUser $appUser */
        foreach ($appUsers as $appUser) {
            /** @var AccessToken $accessToken */
            foreach ($appUser->getAccessTokens() as $accessToken) {
                $this->accessTokenUserCombinations[$accessToken->getId()] = $appUser->getId();
                $accessToken->setUser(null);
                $this->entityManager->persist($accessToken);
            }

            /** @var RefreshToken $refreshToken */
            foreach ($appUser->getRefreshTokens() as $refreshToken) {
                $this->refreshTokenUserCombinations[$refreshToken->getId()] = $appUser->getId();
                $refreshToken->setUser(null);
                $this->entityManager->persist($refreshToken);
            }

            /** @var Device $device */
            foreach ($appUser->getDevices() as $device) {
                $this->refreshTokenUserCombinations[$device->getId()] = $appUser->getId();
                $device->setUser(null);
                $this->entityManager->persist($device);
            }
        }

        file_put_contents($this->kernel->getProjectDir() . '/access_tokens.json', json_encode($this->accessTokenUserCombinations));
        file_put_contents($this->kernel->getProjectDir() . '/refresh_tokens.json', json_encode($this->refreshTokenUserCombinations));
        file_put_contents($this->kernel->getProjectDir() . '/devices.json', json_encode($this->deviceMapping));

        $this->entityManager->flush();
    }

    private function updateApplicationColors()
    {
//        $applications = $this->entityManager->getRepository(\Pronto\MobileBundle\Entity\Application::class)->findAll();
//
//        foreach ($applications as $application) {
//            $application->setColor('#' . $application->getColor());
//            $this->entityManager->persist($application);
//        }

        $customers = $this->entityManager->getRepository(\Pronto\MobileBundle\Entity\Customer::class)->findAll();

        foreach ($customers as $customer) {
            $customer->setPrimaryColor('#' . str_replace('#', '', $customer->getPrimaryColor()));
            $customer->setPrimaryColorDark($customer->getPrimaryColor());
            $customer->setLinkColor($customer->getPrimaryColor());
            $customer->setLinkColorDark($customer->getPrimaryColor());
            $customer->setContrastColor('#ffffff');
            $this->entityManager->persist($customer);
        }

        $this->entityManager->flush();
    }
}
