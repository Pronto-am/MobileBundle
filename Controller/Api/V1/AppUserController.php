<?php

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\AppUser\PasswordReset;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Form\ResetPasswordForm;
use Swift_Mailer;
use Swift_Message;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Translation\TranslatorInterface;

class AppUserController extends BaseApiController
{
	/**
	 * Get the plugin identifier
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::APP_USERS;
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

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Doctrine\ORM\NoResultException
	 * @throws \Doctrine\ORM\NonUniqueResultException
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function registerAction(Request $request, EntityManagerInterface $entityManager)
	{
		// Validate the authorization
		$this->validateAuthorization($this->getPluginIdentifier());

		// Validate the body
		$this->validateRequestContent($request, ['first_name', 'last_name', 'email', 'password']);

		$configuration = $this->prontoMobile->getPluginConfiguration(Plugin::APP_USERS, $this->prontoMobile->getApplication());

		// Check if registration is enabled
		if (!$configuration[Plugin::APP_USERS_REGISTRATION_ENABLED]) {
			$this->notAuthorizedResponse();
		}

		// Retrieve the content from the request
		$content = json_decode($request->getContent());

		/** @var AppUser $user */
		$user = $entityManager->getRepository(AppUser::class)->findOneBy([
			'email'       => $content->email,
			'application' => $this->prontoMobile->getApplication()
		]);

		if ($user !== null) {
			$this->customErrorResponse(AppUser::USER_ALREADY_REGISTERED);
		}

		$user = new AppUser();
		$user->setApplication($this->prontoMobile->getApplication());

		$user->setFirstName($content->first_name);
		$user->setLastName($content->last_name);
		$user->setEmail($content->email);
		$user->setPlainPassword($content->password);
		$user->setLastLogin(new \DateTime());

		// If account activation via email is not necessary, mark the user as active
		if (!$configuration[Plugin::APP_USERS_ACTIVATION_REQUIRED]) {
			$user->setActivated(true);
		}

		// Save additional data
		if (isset($content->extra_data)) {
			$user->setExtraData($content->extra_data);
		}

		$entityManager->persist($user);
		$entityManager->flush();

		return $this->successResponse($this->serializer->serialize($user, [new DateTimeNormalizer()]));
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
	 * @param EntityManagerInterface $entityManager
	 * @param $userIdentifier
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function deregisterAction(EntityManagerInterface $entityManager, $userIdentifier)
	{
		$this->validateAuthorization($this->getPluginIdentifier());

		/** @var AppUser $user */
		$user = $entityManager->getRepository(AppUser::class)->find($userIdentifier);

		if ($user === null) {
			$this->objectNotFoundResponse(AppUser::class);
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
	 * @apiUse ObjectNotFound
	 * @apiUse AuthorizationErrors
	 */

	/**
	 * @param Request $request
	 * @param Swift_Mailer $mailer
	 * @param EntityManagerInterface $entityManager
	 * @param TranslatorInterface $translator
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function requestPasswordResetLinkAction(Request $request, Swift_Mailer $mailer, EntityManagerInterface $entityManager, TranslatorInterface $translator)
	{
		// Validate the authorization header
		$this->validateAuthorization($this->getPluginIdentifier());

		// Validate the body
		$this->validateRequestContent($request, ['email']);

		/** @var Application $application */
		$application = $this->prontoMobile->getApplication();

		$content = json_decode($request->getContent());

		/** @var AppUser $user */
		$user = $entityManager->getRepository(AppUser::class)->findOneBy([
			'application' => $application,
			'email'       => $content->email
		]);

		// Return a 404
		if ($user === null) {
			$this->objectNotFoundResponse(AppUser::class);
		}

		// Create a new password reset token
		$passwordReset = new PasswordReset($user);

		$entityManager->persist($passwordReset);
		$entityManager->flush();

		// Lowercase and strip spaces from the company name
		$companyEmail = strtolower(str_replace(' ', '', $application->getCustomer()->getCompanyName()));

		// Get the domain name of the CMS
		$domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

		// Build the message with the password reset link
		$message = (new Swift_Message($application->getName() . ' | ' . $translator->trans('authentication.reset_password')))
			->setFrom($companyEmail . '@' . $domain)
			->setTo($user->getEmail())
			->setBody(
				$this->renderView(
					'mails/users/app/password.html.twig',
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

		return $this->successResponse(null, 'The user has received a password reset link');
	}


	/**
	 * Show the reset password form
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param TranslatorInterface $translator
	 * @param $token
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
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
	 * Get the profile off a user
	 *
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function getProfileAction()
	{
		// Validate the authorization
		$this->validateAuthorization($this->getPluginIdentifier());

		$user = $this->getUser();

		if ($user === null) {
			$this->notAuthorizedResponse();
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
	 * Update the users' profile
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function updateProfileAction(Request $request, EntityManagerInterface $entityManager)
	{
		// Validate the body
		$this->validateRequestContent($request, ['first_name', 'last_name', 'email']);

		// Validate the authorization
		$this->validateAuthorization($this->getPluginIdentifier());

		// Retrieve the content from the request
		$content = json_decode($request->getContent());

		/** @var AppUser $user */
		$user = $this->getUser();

		if ($user === null) {
			$this->notAuthorizedResponse();
		}

		// Check if the new email address already exists
		if ($user->getEmail() !== $content->email) {
			$existingUsers = $entityManager->getRepository(AppUser::class)->findBy([
				'email'       => $content->email,
				'application' => $this->prontoMobile->getApplication()
			]);

			if (count($existingUsers) > 0) {
				$this->customErrorResponse(AppUser::EMAIL_ADDRESS_ALREADY_EXISTS);
			}
		}

		// Update the users' info
		$user->setFirstName($content->first_name);
		$user->setLastName($content->last_name);
		$user->setEmail($content->email);

		// Update the password if it's been provided
		if (isset($content->password)) {
			$user->setPlainPassword($content->password);
		}

		// Save additional data
		if (isset($content->extra_data)) {
			$user->setExtraData($content->extra_data);
		}

		$entityManager->persist($user);
		$entityManager->flush();

		return $this->successResponse($this->serializer->serialize($user, [new DateTimeNormalizer()]));
	}
}