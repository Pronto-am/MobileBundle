<?php

namespace Pronto\MobileBundle\Security;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Entity\User\UserLogin;
use Pronto\MobileBundle\Form\LoginForm;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use troovers\Browser\Browser;

class LoginFormAuthenticator extends AbstractFormLoginAuthenticator
{
    use TargetPathTrait;

    private FormFactoryInterface $formFactory;

    private EntityManagerInterface $entityManager;

    private RouterInterface $router;

    private UserPasswordHasherInterface $passwordHasher;

    private AuthorizationCheckerInterface $authorizationChecker;

    public function __construct(
        FormFactoryInterface          $formFactory,
        EntityManagerInterface        $entityManager,
        RouterInterface               $router,
        UserPasswordHasherInterface   $passwordHasher,
        AuthorizationCheckerInterface $authorizationChecker
    ) {
        $this->formFactory = $formFactory;
        $this->entityManager = $entityManager;
        $this->router = $router;
        $this->passwordHasher = $passwordHasher;
        $this->authorizationChecker = $authorizationChecker;
    }

    /**
     * @return RedirectResponse|AccessDeniedException
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        // if the user hits a secure page and start() was called, this was
        // the URL they were on, and probably where you want to redirect to
        $targetPath = $this->getTargetPath($request->getSession(), $providerKey);

        if (!$targetPath) {
            $targetPath = $this->router->generate('pronto_mobile_homepage');
        }

        $request->getSession()->set('targetPath', $targetPath);

        $user = $token->getUser();

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

    public function getCredentials(Request $request)
    {
        $form = $this->formFactory->create(LoginForm::class);
        $form->handleRequest($request);

        $data = $form->getData();

        $request->getSession()->set(
            Security::LAST_USERNAME,
            $data['email']
        );

        return $data;
    }

    /**
     * @throws AuthenticationException
     * @throws NonUniqueResultException
     */
    public function getUser($credentials, UserProviderInterface $userProvider): ?UserInterface
    {
        $username = $credentials['email'];

        return $this->entityManager->getRepository(User::class)->findActiveByEmail($username);
    }

    /**
     * @throws AuthenticationException
     */
    public function checkCredentials($credentials, UserInterface $user): bool
    {
        $password = $credentials['password'];

        return $this->passwordHasher->isPasswordValid($user, $password);
    }

    public function supports(Request $request): bool
    {
        return $request->getPathInfo() === '/login' && $request->isMethod('POST');
    }

    protected function getLoginUrl(): string
    {
        return $this->router->generate('pronto_mobile_login');
    }
}
