<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\User\ProfileDTO;
use Pronto\MobileBundle\DTO\UserDTO;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\Form\PasswordForm;
use Pronto\MobileBundle\Form\ProfileForm;
use Pronto\MobileBundle\Form\UserForm;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Swift_Mailer;
use Swift_Message;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Translation\TranslatorInterface;

class UserController extends BaseController implements ValidateCustomerSelectionInterface
{
	/**
	 * Show a list of CMS users
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request, EntityManagerInterface $entityManager)
	{
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
	 * @param EntityManagerInterface $entityManager
	 * @param UserInterface $user
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function profileAction(Request $request, EntityManagerInterface $entityManager, UserInterface $user)
	{
		$profileDTO = ProfileDTO::fromEntity($user);
		$profileForm = $this->createForm(ProfileForm::class, $profileDTO);

		$passwordForm = $this->createForm(PasswordForm::class);

		if ('POST' === $request->getMethod()) {
			if ($request->request->has('profile_form')) {
				$profileForm->handleRequest($request);

				if ($profileForm->isSubmitted() && $profileForm->isValid()) {
					$profileDTO = $profileForm->getData();
					$user = $profileDTO->toEntity($user);

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
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     * @param Swift_Mailer $mailer
     * @param User|null $user
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
	public function editAction(Request $request,
							   EntityManagerInterface $entityManager,
							   TranslatorInterface $translator,
							   Swift_Mailer $mailer,
							   User $user = null)
	{
        $customer = $this->getCustomer();

		// The user is not allowed to edit users belonging to other customers
		if ($user !== null && $user->getCustomer()->getId() !== $customer->getId()) {
			return $this->redirectToRoute('pronto_mobile_users');
		}

		$userDTO = UserDTO::fromEntity($user);
		$form = $this->createForm(UserForm::class, $userDTO);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$userDTO = $form->getData();

			/** @var User $user */
			$user = $userDTO->toEntity($user ?? new User());

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

			$domain = $this->prontoMobile->getConfiguration('domain', 'pronto.am');

			if ($new) {
				// Create an account activation link for the user and mail it
				$message = (new Swift_Message($translator->trans('authentication.create_password')))
					->setFrom('noreply@' . $domain)
					->setTo($user->getEmail())
					->setBody(
						$this->renderView('@ProntoMobile/mails/registration.html.twig', [
							'user'   => $user,
							'action' => [
								'url'  => $this->generateUrl('pronto_mobile_create_password', ['token' => $user->getActivationToken()], UrlGeneratorInterface::ABSOLUTE_URL),
								'text' => $translator->trans('authentication.create_password')
							]
						]), 'text/html');

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
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request, EntityManagerInterface $entityManager)
	{
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
