<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventListener\Doctrine\Application;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Events;
use League\Bundle\OAuth2ServerBundle\Manager\ClientManagerInterface;
use League\Bundle\OAuth2ServerBundle\Model\Client;
use League\Bundle\OAuth2ServerBundle\ValueObject\Grant;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\PluginInitializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: Application::class)]
class InitializeOAuthClient
{
    private Request $request;

    public function __construct(
        RequestStack $requestStack,
        private readonly TokenStorageInterface $tokenStorage,
        private readonly PluginInitializer $initializer,
        private readonly ClientManagerInterface $clientManager,
        private readonly EntityManagerInterface $entityManager
    ) {
        $this->request = $requestStack->getCurrentRequest();
    }

    public function postPersist(Application $application, PostPersistEventArgs $args): void
    {
        $this->initializeFirstVersion(
            application: $application
        );

        $this->createClient(
            application: $application
        );
    }

    private function initializeFirstVersion(Application $application): void
    {
        $version = new Version();
        $version->setName('V1');
        $version->setApplication($application);

        $this->entityManager->persist($version);
        $this->entityManager->flush();

        // Add the plugins and deactivate them
        $plugins = $this->entityManager->getRepository(Plugin::class)->findAll();

        /** @var Plugin $plugin */
        foreach ($plugins as $plugin) {
            $this->initializer->initialize($application, $plugin);
        }

        $this->entityManager->flush();

        $token = $this->tokenStorage->getToken();
        $repository = $this->entityManager->getRepository(Application::class);

        if ($token !== null && $repository->count(['customer' => $application->getCustomer()]) === 1) {
            $this->request->getSession()->set(Version::SESSION_IDENTIFIER, $version->getId());
        }
    }

    private function createClient(Application $application): void
    {
        $client = new Client(
            $application->getName() . ' Client',
            hash('md5', random_bytes(16)),
            hash('sha512', random_bytes(32))
        );

        $client->setActive(true);
        $client->setGrants(...array_map(static function (string $grant): Grant {
            return new Grant($grant);
        }, [
            'client_credentials',
            'password',
            'refresh_token',
        ]));

        $this->clientManager->save($client);

        $applicationClient = new Application\ApplicationClient($application, $client, 'Default');
        $this->entityManager->persist($applicationClient);
        $this->entityManager->flush();
    }
}
