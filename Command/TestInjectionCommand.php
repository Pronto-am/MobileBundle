<?php

namespace Pronto\MobileBundle\Command;

use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class TestInjectionCommand extends Command
{
    /**
     * MigrateCommand constructor.
     * @param ProntoMobile $mobile
     * @param ContainerInterface $container
     */
    public function __construct(ProntoMobile $mobile, ContainerInterface $container)
    {
        dump($mobile->getConfiguration('domain'));

        $prontoMobile = $container->get('pronto_mobile.global.app');
        dump($prontoMobile->getConfiguration('domain'));

        parent::__construct();
    }

    /**
     * Configure the command
     */
    protected function configure(): void
    {
        $this->setName('injection:test')->setDescription('Create a new user instance');
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
        //
    }
}
