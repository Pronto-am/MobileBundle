<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use League\Bundle\OAuth2ServerBundle\Manager\ClientManagerInterface;
use League\Bundle\OAuth2ServerBundle\Model\Client;
use League\Bundle\OAuth2ServerBundle\Model\Grant;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\PluginInitializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ApplicationSubscriber implements EventSubscriber
{
    private TokenStorageInterface $tokenStorage;
    private ?Request $request;
    private PluginInitializer $initializer;
    private Application $application;
    private ClientManagerInterface $clientManager;
    private EntityManagerInterface $entityManager;

    public function __construct(
        RequestStack $requestStack,
        TokenStorageInterface $tokenStorage,
        PluginInitializer $initializer,
        ClientManagerInterface $clientManager,
        EntityManagerInterface $entityManager
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->request = $requestStack->getCurrentRequest();
        $this->initializer = $initializer;
        $this->clientManager = $clientManager;
        $this->entityManager = $entityManager;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::prePersist, Events::postPersist];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        if (!$entity instanceof Application) {
            return;
        }

        $entity->setRedirectUris([
            'https://pronto.am'
        ]);

        $entity->setAllowedGrantTypes([
            'refresh_token', 'password', 'token', 'client_credentials'
        ]);
    }

    /**
     * @throws ORMException
     */
    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getEntity();

        if (!$entity instanceof Application) {
            return;
        }

        $this->application = $entity;

        $this->initializeFirstVersion($args->getEntityManager());
        $this->createClient();
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    private function initializeFirstVersion(EntityManager $entityManager): void
    {
        $version = new Version();
        $version->setName('V1');
        $version->setApplication($this->application);

        $entityManager->persist($version);
        $entityManager->flush();

        // Add the plugins and deactivate them
        $plugins = $entityManager->getRepository(Plugin::class)->findAll();

        /** @var Plugin $plugin */
        foreach ($plugins as $plugin) {
            $this->initializer->initialize($this->application, $plugin);
        }

        $entityManager->flush();

        $token = $this->tokenStorage->getToken();

        if ($token !== null && $entityManager->getRepository(Application::class)->count(['customer' => $this->application->getCustomer()]) === 1) {
            $this->request->getSession()->set(Version::SESSION_IDENTIFIER, $version->getId());
        }
    }

    private function createClient()
    {
        $client = new Client(
            $this->application->getName() . ' Client',
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

        $applicationClient = new Application\ApplicationClient($this->application, $client, 'Default');
        $this->entityManager->persist($applicationClient);
        $this->entityManager->flush();
    }
}
