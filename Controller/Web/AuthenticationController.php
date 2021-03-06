<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\PasswordReset;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\EventSubscriber\RedirectWhenAuthenticatedInterface;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;
use Pronto\MobileBundle\Form\LoginForm;
use Pronto\MobileBundle\Form\ResetPasswordEmailForm;
use Pronto\MobileBundle\Form\ResetPasswordForm;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use RuntimeException;
use Swift_Mailer;
use Swift_Message;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Translation\TranslatorInterface;

class AuthenticationController extends BaseController implements RedirectWhenAuthenticatedInterface
{
    /**
     * Show the login form
     *
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    public function loginAction(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $form = $this->createForm(LoginForm::class, [
            'email' => $lastUsername,
        ]);

        return $this->render('@ProntoMobile/authentication/login.html.twig', [
            'form'  => $form->createView(),
            'error' => $error,
        ]);
    }


    /**
     * Let the user select a customer from the list
     *
     * @return Response
     */
    public function selectCustomerAction(): Response
    {
        $user = $this->getUser();

        $customerUsers = $user->getCustomerUsers();

        return $this->render('@ProntoMobile/customers/customers.html.twig', [
            'customerUsers' => $customerUsers
        ]);
    }


    /**
     * Set the customer using the selection list
     *
     * @param Request $request
     * @return JsonResponse
     * @throws EntityNotFoundException
     */
    public function setCustomerAction(Request $request): JsonResponse
    {
        $id = $request->request->get('id');

        if ($id === null) {
            throw new EntityNotFoundException();
        }

        $response = new SuccessResponse(['url' => $targetPath = $this->generateAbsoluteUrl('pronto_mobile_homepage')]);
        $response = $response->create()->getJsonResponse();

        $response->headers->setCookie(new Cookie('customer', $id, time() + 60 * 60 * 24));

        return $response;
    }


    /**
     * Show the reset password form
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param AuthenticationUtils $authenticationUtils
     * @param Swift_Mailer $mailer
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function resetPasswordFormAction(Request $request,
                                            EntityManagerInterface $entityManager,
                                            AuthenticationUtils $authenticationUtils,
                                            Swift_Mailer $mailer,
                                            TranslatorInterface $translator): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $form = $this->createForm(ResetPasswordEmailForm::class, [
            'email' => $lastUsername,
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            /** @var User $user */
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

            $domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

            if ($user !== null) {
                // Create a password reset link for the user and mail it
                $passwordReset = new PasswordReset($user);

                $entityManager->persist($passwordReset);
                $entityManager->flush();

                $message = (new Swift_Message($translator->trans('authentication.reset_password')))
                    ->setFrom('noreply@' . $domain)
                    ->setTo($user->getEmail())
                    ->setBody(
                        $this->renderView(
                            '@ProntoMobile/mails/password.html.twig',
                            [
                                'user'   => $user,
                                'action' => [
                                    'url'  => $this->generateUrl('pronto_mobile_reset_password', ['token' => $passwordReset->getToken()], UrlGeneratorInterface::ABSOLUTE_URL),
                                    'text' => $translator->trans('authentication.reset_password')
                                ]
                            ]
                        ),
                        'text/html'
                    );

                $mailer->send($message);
            }

            $this->addFlash(
                'success',
                sprintf($translator->trans('authentication.reset_password_email_success'))
            );

            return $this->redirectToRoute('pronto_mobile_login');
        }

        return $this->render('@ProntoMobile/authentication/password.html.twig',
            [
                'form'  => $form->createView(),
                'error' => $error,
            ]);
    }


    /**
     * Show the reset password form
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     * @param $token
     * @return Response
     */
    public function resetPasswordAction(Request $request, EntityManagerInterface $entityManager, TranslatorInterface $translator, $token): Response
    {
        /** @var PasswordReset $passwordReset */
        $passwordReset = $entityManager->getRepository(PasswordReset::class)->findOneBy([
            'token' => $token
        ]);

        if ($passwordReset === null) {
            $this->addNoPermissionFlash();
            return $this->redirectToRoute('pronto_mobile_login');
        }

        // Check if the reset link has expired (1 hour)
        $now = new \DateTime();
        $difference = $now->diff($passwordReset->getCreatedAt());
        $hours = $difference->h + ($difference->days * 24);

        if ($hours > 1) {
            $entityManager->remove($passwordReset);
            $entityManager->flush();

            $this->addFlash('alert-danger', $translator->trans('user.password_reset_link_expired'));
            return $this->redirectToRoute('pronto_mobile_login');
        }

        $form = $this->createForm(ResetPasswordForm::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            /** @var User $user */
            $user = $passwordReset->getUser();
            $user->setPlainPassword($data['password']);

            // Save the users' new password
            $entityManager->persist($user);

            // Delete the password reset object
            $entityManager->remove($passwordReset);

            $entityManager->flush();

            $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
            $this->get('security.token_storage')->setToken($token);
            $this->get('session')->set('_security_main', serialize($token));

            if ($user->getCustomer() !== null) {
                // Set the customer in the cache
                $request->getSession()->set(Customer::SESSION_IDENTIFIER, $user->getCustomer()->getId());

                return $this->redirectToRoute('pronto_mobile_select_application');
            }

            return $this->redirectToRoute('pronto_mobile_select_customer');
        }

        return $this->render('@ProntoMobile/authentication/password-reset.html.twig', [
            'form'      => $form->createView(),
            'resetting' => true
        ]);
    }


    /**
     * Show the create password form
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param $token
     * @return Response
     */
    public function createPasswordAction(Request $request, EntityManagerInterface $entityManager, $token): Response
    {
        /** @var User $user */
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'activationToken' => $token
        ]);

        if ($user === null) {
            $this->addNoPermissionFlash();
            return $this->redirectToRoute('pronto_mobile_login');
        }

        $form = $this->createForm(ResetPasswordForm::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            $user->setPlainPassword($data['password']);
            $user->setActivationToken(null);

            // Save the users' new password
            $entityManager->persist($user);
            $entityManager->flush();

            $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
            $this->get('security.token_storage')->setToken($token);
            $this->get('session')->set('_security_main', serialize($token));

            if ($user->getCustomer() !== null) {
                // Set the customer in the cache
                $request->getSession()->set(Customer::SESSION_IDENTIFIER, $user->getCustomer()->getId());

                return $this->redirectToRoute('pronto_mobile_select_application');
            }

            return $this->redirectToRoute('pronto_mobile_select_customer');
        }

        return $this->render('@ProntoMobile/authentication/password-reset.html.twig',
            [
                'form'      => $form->createView(),
                'resetting' => false
            ]);
    }

    /**
     * Log the user out
     */
    public function logoutAction()
    {
        throw new RuntimeException('this should not be reached!');
    }
}
