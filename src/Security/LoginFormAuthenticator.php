<?php

namespace Pronto\MobileBundle\Security;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Entity\User\UserLogin;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use troovers\Browser\Browser;

class LoginFormAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    private FormFactoryInterface $formFactory;

    private EntityManagerInterface $entityManager;

    private RouterInterface $router;

    private UserPasswordHasherInterface $passwordHasher;

    private AuthorizationCheckerInterface $authorizationChecker;

    public function __construct(
        FormFactoryInterface $formFactory,
        EntityManagerInterface $entityManager,
        RouterInterface $router,
        UserPasswordHasherInterface $passwordHasher,
        AuthorizationCheckerInterface $authorizationChecker
    ) {
        $this->formFactory = $formFactory;
        $this->entityManager = $entityManager;
        $this->router = $router;
        $this->passwordHasher = $passwordHasher;
        $this->authorizationChecker = $authorizationChecker;
    }

    public function authenticate(Request $request): Passport
    {
        $input = $request->request->all('login_form') ?? [];

        return new Passport(
            new UserBadge($input['email'], function ($userIdentifier) {
                return $this->entityManager->getRepository(User::class)->findActiveByEmail($userIdentifier);
            }),
            new PasswordCredentials(
                $input['password']
            ),
        );
    }

    /**
     * @return RedirectResponse|AccessDeniedException
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // if the user hits a secure page and start() was called, this was
        // the URL they were on, and probably where you want to redirect to
        $targetPath = $this->getTargetPath($request->getSession(), $firewallName);

        if (!$targetPath) {
            $targetPath = $this->router->generate('pronto_mobile_homepage');
        }

        $request->getSession()->set('targetPath', $targetPath);

        $user = $token->getUser();

        $this->upgradePassword($request, $user);

        $this->saveLogin($user);

        /** @var Customer $customer */
        $customer = $user->getCustomer();

        // If the user has access to multiple customers, let him choose one
        if ($this->authorizationChecker->isGranted('ROLE_SUPER_ADMIN')) {
            return new RedirectResponse($this->router->generate('pronto_mobile_select_customer'));
        }

        if ($customer === null) {
            return new AccessDeniedException();
        }

        // Set the customer in the cache
        $request->getSession()->set(Customer::SESSION_IDENTIFIER, $customer->getId());

        return new RedirectResponse($this->router->generate('pronto_mobile_select_application'));
    }

    private function saveLogin(User $user): void
    {
        $browser = new Browser();

        $login = new UserLogin();
        $login->setUser($user);
        $login->setBrowserName($browser->getBrowser());
        $login->setPlatform($browser->getPlatform());
        $login->setVersion($browser->getVersion());
        $login->setAolVersion($browser->getAolVersion());
        $login->setMobile($browser->isMobile());
        $login->setTablet($browser->isTablet());
        $login->setFacebook($browser->isFacebook());
        $login->setChromeFrame($browser->isChromeFrame());
        $login->setRobot($browser->isRobot());
        $login->setUserAgent($browser->getUserAgent());

        $this->entityManager->persist($login);
        $this->entityManager->flush();
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->router->generate('pronto_mobile_login');
    }

    private function upgradePassword(Request $request, User $user)
    {
        $input = $request->request->all('login_form') ?? [];

        // Rehash password
        $this->entityManager->getRepository(User::class)->upgradePassword(
            $user,
            $this->passwordHasher->hashPassword($user, $input['password'])
        );
    }
}
