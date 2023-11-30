<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\Customer;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PostLoadEventArgs;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Events;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Service\FileManager;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: Customer::class)]
#[AsEntityListener(event: Events::postLoad, method: 'postLoad', entity: Customer::class)]
class InitializeAccount
{
    private ProntoMobile $prontoMobile;

    public function __construct(
        private readonly FileManager $fileManager,
        private readonly EntityManagerInterface $entityManager,
        private readonly TranslatorInterface $translator,
        ContainerInterface $container,
    ) {
        $this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
    }

    public function postPersist(Customer $customer, PostPersistEventArgs $args): void
    {
        // Initialize a new account
        $this->initializeAccount($customer);
    }

    private function initializeAccount(Customer $customer): void
    {
        // Add the first application and version
        $app = new Application();
        $app->setName($this->translator->trans('application.first'));
        $app->setColor('00f4a7');
        $app->setDefaultLanguage('nl');
        $app->setAvailableLanguages([
            [
                'code'       => 'nl',
                'name'       => 'Dutch',
                'nativeName' => 'Nederlands, Vlaams'
            ]
        ]);

        $app->setCustomer($customer);

        $domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

        $app->setRedirectUris(['https://' . $domain]);
        $app->setAllowedGrantTypes(['refresh_token', 'password', 'token', 'authorization_code', 'client_credentials']);

        $this->entityManager->persist($app);
        $this->entityManager->flush();
    }

    public function postLoad(Customer $customer, PostLoadEventArgs $args): void
    {
        if ($fileName = $customer->getLogo()) {
            // Check if the logo exists
            $file = $this->fileManager->get(FileManager::IMAGES_DIRECTORY . '/' . $fileName);

            // Get the path name instead of the File object -> leads to serialization errors
            $customer->setLogo($file?->getFilename());
        }
    }
}
