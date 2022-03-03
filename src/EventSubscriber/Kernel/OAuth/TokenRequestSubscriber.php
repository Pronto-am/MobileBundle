<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber\Kernel\OAuth;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Application;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Trikoder\Bundle\OAuth2Bundle\Model\Client;

class TokenRequestSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'switchClientIdentifier',
        ];
    }

    public function switchClientIdentifier(RequestEvent $event): void
    {
        $request = $event->getRequest();
        if ($request->getRequestUri() !== '/oauth/v2/token') {
            return;
        }

        if ($request->headers->has('authorization')) {
            $credentials = $this->getCredentialsFromHeaders($request);
            if ($credentials !== null) {
                [
                    'clientId'     => $clientId,
                    'clientSecret' => $clientSecret
                ] = $credentials;

                $newCredentials = base64_encode(sprintf('%s:%s', $clientId, $clientSecret));
                $event->getRequest()->headers->set('authorization', $newCredentials);
            }
        }

        // Get the client id from the parameters
        if ($request->request->has('client_id')) {
            $clientId = $this->getClientIdFromBody($request);
            if ($clientId !== null) {
                $event->getRequest()->request->set('client_id', $clientId);
            }
        }
    }

    private function getCredentialsFromHeaders(Request $request): ?array
    {
        $credentials = $request->headers->get('authorization');
        $credentials = base64_decode($credentials);

        if ($credentials === false || strpos($credentials, ':') === false) {
            return null;
        }

        [$clientId, $clientSecret] = explode(':', $credentials);
        if ($clientId === null || $clientSecret === null) {
            return null;
        }

        $client = $this->getClient($clientId, $clientSecret);
        if ($client === null) {
            return null;
        }

        return [
            'clientId'     => $client->getIdentifier(),
            'clientSecret' => $clientSecret,
        ];
    }

    private function getClient(string $clientId, string $clientSecret): ?Client
    {
        $applicationRepository = $this->entityManager->getRepository(Application::class);

        $exploded = $this->disectClientId($clientId);
        if ($exploded === null) {
            return null;
        }

        ['id' => $id, 'randomId' => $randomId] = $exploded;

        /** @var Application $application */
        $application = $applicationRepository->findOneBy([
            'id'       => $id,
            'randomId' => $randomId,
            'secret'   => $clientSecret,
        ]);

        $applicationClient = $application->getApplicationClients()->filter(
            static function (Application\ApplicationClient $applicationClient) use ($clientSecret) {
                return $applicationClient->getClient()->getSecret() === $clientSecret;
            }
        )->first();

        if (!$applicationClient instanceof Application\ApplicationClient) {
            return null;
        }

        return $applicationClient->getClient();
    }

    private function disectClientId(string $clientId): ?array
    {
        $parts = explode('_', $clientId);

        if (count($parts) !== 2) {
            return null;
        }

        return [
            'id'       => $parts[0],
            'randomId' => $parts[1],
        ];
    }

    private function getClientIdFromBody(Request $request): ?string
    {
        $clientId = $request->request->get('client_id');
        $clientSecret = $request->request->get('client_secret');

        // The identifiers are located in the body
        if ($clientId === null || $clientSecret === null) {
            return null;
        }

        $client = $this->getClient($clientId, $clientSecret);
        if ($client === null) {
            return null;
        }

        return $client->getIdentifier();
    }
}
