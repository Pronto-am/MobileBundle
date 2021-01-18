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

    /** @var FormFactoryInterface */
    private $formFactory;

    /** @var EntityManager */
    private $entityManager;

    /** @var RouterInterface */
    private $router;

    /** @var UserPasswordEncoder */
    private $passwordEncoder;

    /** @var AuthorizationCheckerInterface */
    private $authorizationChecker;

    /**
     * LoginFormAuthenticator constructor.
     * @param FormFactoryInterface $formFactory
     * @param EntityManagerInterface $entityManager
     * @param RouterInterface $router
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param AuthorizationCheckerInterface $authorizationChecker
     */
    public function __construct(FormFactoryInterface $formFactory, EntityManagerInterface $entityManager, RouterInterface $router, UserPasswordEncoderInterface $passwordEncoder, AuthorizationCheckerInterface $authorizationChecker)
    {
        $this->formFactory = $formFactory;
        $this->entityManager = $entityManager;
        $this->router = $router;
        $this->passwordEncoder = $passwordEncoder;
        $this->authorizationChecker = $authorizationChecker;
    }

    /**
     * On authentication success
     *
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey
     * @return RedirectResponse|AccessDeniedException
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
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

    /**
     * Save the login of the user
     *
     * @param User $user
     */
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

    /**
     * Get the authentication credentials from the request and return them
     * as any type (e.g. an associate array).
     *
     * Whatever value you return here will be passed to getUser() and checkCredentials()
     *
     * For example, for a form login, you might:
     *
     *      return array(
     *          'username' => $request->request->get('_username'),
     *          'password' => $request->request->get('_password'),
     *      );
     *
     * Or for an API token that's on a header, you might use:
     *
     *      return array('api_key' => $request->headers->get('X-API-TOKEN'));
     *
     * @param Request $request
     *
     * @return mixed Any non-null value
     */
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
     * Return a UserInterface object based on the credentials.
     *
     * The *credentials* are the return value from getCredentials()
     *
     * You may throw an AuthenticationException if you wish. If you return
     * null, then a UsernameNotFoundException is thrown for you.
     *
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     *
     * @return UserInterface|null
     * @throws AuthenticationException
     *
     * @throws NonUniqueResultException
     */
    public function getUser($credentials, UserProviderInterface $userProvider): ?UserInterface
    {
        $username = $credentials['email'];

        return $this->entityManager->getRepository(User::class)->findActiveByEmail($username);
    }

    /**
     * Returns true if the credentials are valid.
     *
     * If any value other than true is returned, authentication will
     * fail. You may also throw an AuthenticationException if you wish
     * to cause authentication to fail.
     *
     * The *credentials* are the return value from getCredentials()
     *
     * @param mixed $credentials
     * @param UserInterface $user
     *
     * @return bool
     *
     * @throws AuthenticationException
     */
    public function checkCredentials($credentials, UserInterface $user): bool
    {
        $password = $credentials['password'];

        return $this->passwordEncoder->isPasswordValid($user, $password);
    }

    /**
     * Does the authenticator support the given Request?
     *
     * If this returns false, the authenticator will be skipped.
     *
     * @param Request $request
     *
     * @return bool
     */
    public function supports(Request $request): bool
    {
        return $request->getPathInfo() === '/login' && $request->isMethod('POST');
    }

    /**
     * Return the URL to the login page.
     *
     * @return string
     */
    protected function getLoginUrl(): string
    {
        return $this->router->generate('pronto_mobile_login');
    }
}
