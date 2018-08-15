<?php

namespace Pronto\MobileBundle\Controller\Web;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Form\PasswordForm;
use Pronto\MobileBundle\Form\ProfileForm;
use Pronto\MobileBundle\Form\UserForm;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Swift_Mailer;
use Swift_Message;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserController extends BaseController implements ValidateCustomerSelectionInterface
{
	/**
	 * Show a list of CMS users
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$pageHelper = new PageHelper($request, $entityManager, User::class, 15, 't.lastName');
		$pageHelper->addClause(new WhereClause('t.customer', $this->getCustomer()));

		return $this->render('@ProntoMobile/users/index.html.twig',
			[
				'pageHelper' => $pageHelper
			]);
	}


	/**
	 * Update the users' profile
	 *
	 * @param Request $request
	 * @param UserInterface $user
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function profileAction(Request $request, UserInterface $user)
	{
		$profileForm = $this->createForm(ProfileForm::class, $user);

		$passwordForm = $this->createForm(PasswordForm::class);

		if('POST' === $request->getMethod()) {
			$entityManager = $this->getDoctrine()->getManager();

			if($request->request->has('profile_form')) {
				$profileForm->handleRequest($request);

				if ($profileForm->isSubmitted() && $profileForm->isValid()) {

					/** @var User $user */
					$user = $profileForm->getData();

					$entityManager->persist($user);
					$entityManager->flush();

					$this->addDataSavedFlash();

					return $this->redirectToRoute('pronto_mobile_profile');
				}
			} else {
				$passwordForm->handleRequest($request);

				if ($passwordForm->isSubmitted() && $passwordForm->isValid()) {
					$data = $passwordForm->getData();

					$user->setPlainPassword($data['password']);

					$entityManager->persist($user);
					$entityManager->flush();

					$this->addDataSavedFlash();

					return $this->redirectToRoute('pronto_mobile_profile');
				}
			}
		}

		return $this->render('@ProntoMobile/users/profile.html.twig', [
			'profileForm'  => $profileForm->createView(),
			'passwordForm' => $passwordForm->createView(),
			'user'         => $user
		]);
	}


	/**
	 * Add or edit a user
	 *
	 * @param Request $request
	 * @param User|null $user
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, User $user = null)
	{
		/** @var Swift_Mailer $mailer */
		$mailer = $this->get('swiftmailer.mailer.default');

		$translator = $this->get('translator');

		$customer = $this->getCustomer();

		// The user is not allowed to edit users belonging to other customers
		if ($user !== null && $user->getCustomer()->getId() !== $customer->getId()) {
			return $this->redirectToRoute('pronto_mobile_users');
		}

		$form = $this->createForm(UserForm::class, $user);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$entityManager = $this->getDoctrine()->getManager();

			/** @var User $user */
			$user = $form->getData();

			$user->setCustomer($customer);

			// Remove or add the admin role
			if (!$form->get('admin')->getData()) {
				$user->removeRole('ROLE_ADMIN');
			} else {
				$user->addRole('ROLE_ADMIN');
			}

			$new = $user->getId() === null;

			$entityManager->persist($user);
			$entityManager->flush();

			$prontoMobile = $this->get('pronto_mobile.global.app');
			$domain = $prontoMobile->getConfiguration('domain', 'pronto.am');

			if ($new) {
				// Create an account activation link for the user and mail it
				$message = (new Swift_Message($translator->trans('authentication.create_password')))
					->setFrom('noreply@' . $domain)
					->setTo($user->getEmail())
					->setBody(
						$this->renderView(
							'@ProntoMobile/mails/registration.html.twig',
							[
								'user'   => $user,
								'action' => [
									'url'  => $this->generateUrl('pronto_mobile_create_password', ['token' => $user->getActivationToken()], UrlGeneratorInterface::ABSOLUTE_URL),
									'text' => $translator->trans('authentication.create_password')
								]
							]
						),
						'text/html'
					);

				$mailer->send($message);
			}

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_users');
		}

		return $this->render('@ProntoMobile/users/edit.html.twig', [
			'userForm' => $form->createView(),
			'user'     => $user
		]);
	}


	/**
	 * Delete one or more users
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

		// Find users by id and the current customer
		$users = $entityManager->getRepository(User::class)->findBy([
			'id'       => $request->get('users'),
			'customer' => $this->getCustomer()
		]);

		foreach ($users as $user) {
			$entityManager->remove($user);
		}

		$entityManager->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_users');
	}
}