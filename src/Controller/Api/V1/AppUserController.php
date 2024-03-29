<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Exception;
use League\Bundle\OAuth2ServerBundle\Security\User\NullUser;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\AppUser\PasswordReset;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\AppUsers\EmailAlreadyExistsException;
use Pronto\MobileBundle\Exceptions\AppUsers\NotFoundException;
use Pronto\MobileBundle\Exceptions\AppUsers\UserAlreadyRegisteredException;
use Pronto\MobileBundle\Exceptions\Auth\NotAuthorizedException;
use Pronto\MobileBundle\Form\ResetPasswordForm;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Contracts\Translation\TranslatorInterface;

class AppUserController extends BaseApiController
{
    /**
     * @throws ApiException
     * @throws NoResultException
     * @throws NonUniqueResultException
     * @throws NotAuthorizedException
     */
    public function registerAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization($this->getPluginIdentifier());

        // Validate the body
        $this->validateRequestContent($request, ['first_name', 'last_name', 'email', 'password']);

        $configuration = $this->prontoMobile->getPluginConfiguration(Plugin::APP_USERS, $this->prontoMobile->getApplication());

        // Check if registration is enabled
        if (!$configuration[Plugin::APP_USERS_REGISTRATION_ENABLED]) {
            throw new NotAuthorizedException();
        }

        /** @var AppUser $user */
        $user = $entityManager->getRepository(AppUser::class)->findOneBy([
            'email'       => $request->request->get('email'),
            'application' => $this->prontoMobile->getApplication()
        ]);

        if ($user !== null) {
            throw new UserAlreadyRegisteredException();
        }

        $user = new AppUser();
        $user->setApplication($this->prontoMobile->getApplication());

        $user->setFirstName($request->request->get('first_name'));
        $user->setLastName($request->request->get('last_name'));
        $user->setEmail($request->request->get('email'));
        $user->setPlainPassword($request->request->get('password'));
        $user->setLastLogin(new DateTime());

        // If account activation via email is not necessary, mark the user as active
        if (!$configuration[Plugin::APP_USERS_ACTIVATION_REQUIRED]) {
            $user->setActivated(true);
        }

        // Save additional data
        if ($request->request->all()['extra_data'] !== null) {
            $user->setExtraData(json_decode(json_encode($request->request->all()['extra_data']), true));
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->successResponse($this->serializer->serialize($user, [new DateTimeNormalizer()]));
    }

    /**
     * API-docs: Register a new user
     *
     * @api {post} /v1/users/app/registration Register a user
     * @apiName RegisterAppUser
     * @apiGroup AppUser
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} first_name        First name of the user.
     * @apiParam {String} last_name         Last name of the user.
     * @apiParam {String} email             Email address of the user.
     * @apiParam {String} password          Password of the user.
     * @apiParam {Object} [extra_data]      Extra meta data.
     *
     * @apiParamExample {json} Content:
     *     {
     *       "first_name": "John",
     *       "last_name": "Doe",
     *       "email": "jonhdoe@example.com",
     *       "password": "thisisasecretpassword",
     *       "extra_data": {
     *         "key": "value"
     *       }
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": {
     *         "id": "zC9WahWKVTcdG5BfLfHPU9",
     *         "first_name": "John",
     *         ...
     *         "activation_token": "thisisanactivationtoken"
     *       }
     *     }
     *
     * @apiError UserAlreadyRegistered      This user is already registered
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 422 UserAlreadyRegistered
     *     {
     *       "error": {
     *         "code": 22,
     *         "message": "This user is already registered"
     *       }
     *     }
     *
     * @apiUse InvalidParameters
     * @apiUse AuthorizationErrors
     */

    public function getPluginIdentifier(): string
    {
        return Plugin::APP_USERS;
    }

    /**
     * Deregister an app user
     *
     * @api {delete} /v1/users/app/registration/{userIdentifier} Deregister a user
     * @apiName DeregisterAppUser
     * @apiGroup AppUser
     * @apiVersion 1.0.0
     *
     * @apiParam {String} userIdentifier Identifier of the user
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "The user is unregistered and removed"
     *     }
     *
     * @apiUse ObjectNotFound
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws ApiException
     */
    public function deregisterAction(EntityManagerInterface $entityManager, $userIdentifier): JsonResponse
    {
        $this->validateAuthorization($this->getPluginIdentifier());

        /** @var AppUser $user */
        $user = $entityManager->getRepository(AppUser::class)->find($userIdentifier);

        if ($user === null || $user instanceof NullUser) {
            throw new NotFoundException();
        }

        // Remove the user
        $entityManager->remove($user);
        $entityManager->flush();

        return $this->successResponse(null, 'The user is unregistered and removed');
    }


    /**
     * Request a password reset link
     *
     * @api {post} /v1/users/app/password/reset Password reset request
     * @apiName PasswordResetAppUser
     * @apiGroup AppUser
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} email Email address of the user.
     *
     * @apiParamExample {json} Content:
     *     {
     *       "email": "johndoe@example.com"
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "The user has received a password reset link"
     *     }
     *
     * @apiUse AuthorizationErrors
     */

    /**
     * @throws ApiException
     */
    public function requestPasswordResetLinkAction(Request $request, MailerInterface $mailer, EntityManagerInterface $entityManager, TranslatorInterface $translator): JsonResponse
    {
        // Validate the authorization header
        $this->validateAuthorization($this->getPluginIdentifier());

        // Validate the body
        $this->validateRequestContent($request, ['email']);

        /** @var Application $application */
        $application = $this->prontoMobile->getApplication();

        /** @var AppUser $user */
        $user = $entityManager->getRepository(AppUser::class)->findOneBy([
            'application' => $application,
            'email'       => $request->request->get('email')
        ]);

        // Return a 404
        if ($user === null) {
            return $this->successResponse(null, 'If a user with the provided email address exists, he or she has received a password reset link');
        }

        // Create a new password reset token
        $passwordReset = new PasswordReset($user);

        $entityManager->persist($passwordReset);
        $entityManager->flush();

        // Lowercase and strip spaces from the company name
        $companyEmail = strtolower(str_replace([' ', '+'], '', $application->getCustomer()->getCompanyName()));

        // Get the domain name of the CMS
        $domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

        // Build the message with the password reset link
        $message = (new Email())
            ->subject($application->getName() . ' | ' . $translator->trans('authentication.reset_password'))
            ->from(new Address($companyEmail . '@' . $domain, $application->getCustomer()->getCompanyName()))
            ->to(new Address($user->getEmail(), $user->getFullName()))
            ->html(
                $this->renderView(
                    '@ProntoMobile/mails/users/app/password.html.twig',
                    [
                        'application' => $application,
                        'customer'    => $application->getCustomer(),
                        'user'        => $user,
                        'action'      => [
                            'url'  => $this->generateUrl('pronto_mobile_app_users_reset_password', ['token' => $passwordReset->getToken()], UrlGeneratorInterface::ABSOLUTE_URL),
                            'text' => $translator->trans('authentication.reset_password')
                        ]
                    ]
                ),
                'text/html'
            );

        $mailer->send($message);

        return $this->successResponse(null, 'If a user with the provided email address exists, he or she has received a password reset link');
    }

    /**
     * @throws Exception
     */
    public function resetPasswordAction(Request $request, EntityManagerInterface $entityManager, TranslatorInterface $translator, $token)
    {
        /** @var PasswordReset $passwordReset */
        $passwordReset = $entityManager->getRepository(PasswordReset::class)->findOneBy([
            'token' => $token
        ]);

        if ($passwordReset === null) {
            return $this->redirectToRoute('pronto_mobile_login');
        }

        /** @var Customer $customer */
        $customer = $passwordReset->getUser()->getApplication()->getCustomer();

        // Check if the reset link has expired (1 hour)
        $now = new DateTime();
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

            /** @var AppUser $user */
            $user = $passwordReset->getUser();
            $user->setPlainPassword($data['password']);

            // Save the users' new password
            $entityManager->persist($user);
            $entityManager->remove($passwordReset);
            $entityManager->flush();

            $resetting = false;
        }

        return $this->render('@ProntoMobile/authentication/app/password-reset.html.twig', [
            'form'      => $form->createView(),
            'resetting' => $resetting ?? true,
            'customer'  => $customer
        ]);
    }

    /**
     * API-docs: Get the app users' profile
     *
     * @api {get} /v1/users/app/profile Get the users' profile
     * @apiName GetAppUserProfile
     * @apiGroup AppUser
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": {
     *         "id": "zC9WahWKVTcdG5BfLfHPU9",
     *         "first_name": "John",
     *         ...
     *         "activation_token": "thisisanactivationtoken",
     *         "meta_data": {
     *           "gender": "male"
     *         }
     *       }
     *     }
     *
     * @apiUse OAuthAuthorizationErrors
     * @apiUse NotAuthorized
     */

    /**
     * @throws ApiException
     */
    public function getProfileAction(): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization($this->getPluginIdentifier());

        $user = $this->getUser();

        if ($user === null || $user instanceof NullUser) {
            throw new NotAuthorizedException();
        }

        return $this->successResponse($this->serializer->serialize($user, [new DateTimeNormalizer()]));
    }

    /**
     * API-docs: Update the app users' profile
     *
     * @api {put} /v1/users/app/profile Update the users' profile
     * @apiName UpdateAppUserProfile
     * @apiGroup AppUser
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} first_name        First name of the user.
     * @apiParam {String} last_name         Last name of the user.
     * @apiParam {String} email             Email address of the user.
     * @apiParam {String} [password]        Password of the user.
     * @apiParam {Object} [extra_data]      Extra meta data.
     *
     * @apiParamExample {json} Content:
     *     {
     *       "first_name": "John",
     *       "last_name": "Doe",
     *       "email": "johndoe@example.com",
     *       "password": "thisisasecretpassword",
     *       "extra_data": {
     *         "key": "value"
     *       }
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": {
     *         "id": "zC9WahWKVTcdG5BfLfHPU9",
     *         "first_name": "John",
     *         ...
     *         "activation_token": "thisisanactivationtoken",
     *         "meta_data": {
     *           "key": "value"
     *         }
     *       }
     *     }
     *
     * @apiError EmailAlreadyExists      The provided email address is already registered
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 422 EmailAlreadyExists
     *     {
     *       "error": {
     *         "code": 1122,
     *         "message": "An account with the provided email address already exists"
     *       }
     *     }
     *
     * @apiUse InvalidParameters
     * @apiUse OAuthAuthorizationErrors
     * @apiUse NotAuthorized
     */

    /**
     * @throws ApiException
     */
    public function updateProfileAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Validate the body
        $this->validateRequestContent($request, ['first_name', 'last_name', 'email']);

        // Validate the authorization
        $this->validateAuthorization($this->getPluginIdentifier());

        /** @var AppUser $user */
        $user = $this->getUser();

        if ($user === null || $user instanceof NullUser) {
            throw new NotAuthorizedException();
        }

        // Check if the new email address already exists
        if ($user->getEmail() !== $request->request->get('email')) {
            $existingUsers = $entityManager->getRepository(AppUser::class)->findBy([
                'email'       => $request->request->get('email'),
                'application' => $this->prontoMobile->getApplication()
            ]);

            if (count($existingUsers) > 0) {
                throw new EmailAlreadyExistsException();
            }
        }

        // Update the users' info
        $user->setFirstName($request->request->get('first_name'));
        $user->setLastName($request->request->get('last_name'));
        $user->setEmail($request->request->get('email'));

        // Update the password if it's been provided
        if ($request->request->get('password') !== null) {
            $user->setPlainPassword($request->request->get('password'));
        }

        // Save additional data
        if ($request->request->all()['extra_data'] !== null) {
            $user->setExtraData(json_decode(json_encode($request->request->all()['extra_data']), true));
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->successResponse($this->serializer->serialize($user, [new DateTimeNormalizer()]));
    }
}
