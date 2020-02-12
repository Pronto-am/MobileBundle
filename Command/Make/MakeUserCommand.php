<?php

namespace Pronto\MobileBundle\Command\Make;


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

class MakeUserCommand extends Command
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * MigrateCommand constructor.
     * @param EntityManagerInterface $entityManager
     * @param null $name
     */
    public function __construct(EntityManagerInterface $entityManager, $name = null)
    {
        $this->entityManager = $entityManager;

        parent::__construct($name);
    }

    /**
     * Configure the command
     */
    protected function configure(): void
    {
        $this->setName('make:user')->setDescription('Create a new user instance');
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
        $user = new User();
        $user->setEmail('troovers@e-sites.nl');
        $user->setFirstName('Thomas');
        $user->setLastName('Roovers');
        $user->setPlainPassword('12345678');
        $user->setRoles(['ROLE_USER', 'ROLE_SUPER_ADMIN']);
        $user->setCreatedAt(new \DateTime());
        $user->setUpdatedAt(new \DateTime());

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $user->setActivationToken(null);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
