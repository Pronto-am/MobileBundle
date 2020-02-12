<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\Auth;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\PasswordReset;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Request\Auth\ResetPasswordRequest;
use Pronto\MobileBundle\Service\OAuthClient;
use Swift_Mailer;
use Swift_Message;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Class LoginController
 * @package Pronto\MobileBundle\Controller\Api\Vue\Auth
 * @Route(path="auth/")
 */
class PasswordController extends ApiController
{
    /**
     * @var OAuthClient $client
     */
    private $client;

    /**
     * LoginController constructor.
     * @param OAuthClient $client
     */
    public function __construct(OAuthClient $client)
    {
        $this->client = $client;
    }

    /**
     * @param ResetPasswordRequest $request
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     * @param Swift_Mailer $mailer
     * @return string
     * @Route(path="password")
     */
    public function resetPasswordAction(ResetPasswordRequest $request, EntityManagerInterface $entityManager, TranslatorInterface $translator, Swift_Mailer $mailer)
    {
        /** @var Application $application */
        $application = $this->prontoMobile->getApplication();

        $user = $entityManager->getRepository(User::class)->findOneBy([
            'appUser'     => false,
            'application' => $application,
            'email'       => $request->get('email')
        ]);

        if ($user === null) {
            return new JsonResponse();
        }

        // Create a new password reset token
        $passwordReset = new PasswordReset($user);

        $entityManager->persist($passwordReset);
        $entityManager->flush();

        // Get the domain name of the CMS
        $domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

        // Build the message with the password reset link
        $message = (new Swift_Message('Pronto | ' . $translator->trans('authentication.reset_password')))
            ->setFrom( 'noreply@' . $domain)
            ->setTo($user->getEmail())
            ->setBody(
                $this->renderView(
                    '@ProntoMobile/mails/users/app/password.html.twig',
                    [
                        'application' => $application,
                        'user'        => $user,
                        'action'      => [
                            'url'  => 'password/reset' .  $passwordReset->getToken(),
                            'text' => $translator->trans('authentication.reset_password')
                        ]
                    ]
                ),
                'text/html'
            );

        $mailer->send($message);

        return new JsonResponse();
    }
}
