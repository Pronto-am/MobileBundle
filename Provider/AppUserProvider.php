<?php

namespace Pronto\MobileBundle\Provider;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use FOS\OAuthServerBundle\Model\AccessTokenManagerInterface;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class AppUserProvider implements UserProviderInterface
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    protected $entityManager;

    /**
     * @var Request $request
     */
    private $request;

    /**
     * AppUserProvider constructor.
     * @param EntityManagerInterface $entityManager
     * @param RequestStack $requestStack
     */
    public function __construct(EntityManagerInterface $entityManager, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->request = $requestStack->getCurrentRequest();
    }

    /**
     * Get user by email address
     *
     * @param string $email
     * @return UserInterface
     * @throws InvalidAuthorizationTokenException
     */
    public function loadUserByUsername($email): UserInterface
    {
        $application = null;

        // Check application
        if ($this->request->request->has('client_id') && $this->request->request->has('client_secret')) {
            $application = $this->determineApplication($this->request->request->get('client_id'), $this->request->request->get('client_secret'));

        } elseif ($this->request->headers->has('Authorization')) {
            // Split header value
            try {
                [, $basic] = explode(' ', $this->request->headers->get('Authorization'));
                [$clientId, $clientSecret] = explode(':', base64_decode($basic));
                $application = $this->determineApplication($clientId, $clientSecret);

            } catch (Exception $exception) {
                throw new InvalidAuthorizationTokenException();
            }
        }

        if ($application === null) {
            throw new InvalidAuthorizationTokenException();
        }

        /** @var AppUser $user */
        $user = $this->entityManager->getRepository(AppUser::class)->findOneBy([
            'email'       => $email,
            'activated'   => true,
            'application' => $application,
        ]);

        if ($user === null) {
            $message = sprintf('Unable to find an active AppUser identified by "%s".', $email);

            throw new UsernameNotFoundException($message, 404);
        }

        return $user;
    }

    /**
     * @param string $clientId
     * @param string $clientSecret
     * @return Application|null
     * @throws InvalidAuthorizationTokenException
     */
    private function determineApplication(string $clientId, string $clientSecret): ?Application
    {
        try {
            [, $randomId] = explode('_', $clientId);

            return $this->entityManager->getRepository(Application::class)->findByOAuthCredentials($randomId, $clientSecret);
        } catch (Exception $exception) {
            throw new InvalidAuthorizationTokenException();
        }
    }

    /**
     * Refresh the user
     *
     * @param UserInterface|AppUser $user
     * @return null|object|UserInterface
     */
    public function refreshUser(UserInterface $user)
    {
        $class = get_class($user);

        if (!$this->supportsClass($class)) {
            throw new UnsupportedUserException(
                sprintf(
                    'Instances of "%s" are not supported.',
                    $class
                )
            );
        }

        return $this->entityManager->getRepository(AppUser::class)->find($user->getId());
    }

    /**
     * @param string $class
     * @return bool
     */
    public function supportsClass($class): bool
    {
        return AppUser::class === $class || is_subclass_of($class, AppUser::class);
    }
}
