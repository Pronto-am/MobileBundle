<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\AppUserDTO;
use Pronto\MobileBundle\Entity\AppUser;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\AppUserForm;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\Request;

class AppUserController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{

	/**
	 * Check if the plugin is active
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::APP_USERS;
	}


	/**
	 * Show a list of app users
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request, EntityManagerInterface $entityManager)
	{
		$pageHelper = new PageHelper($request, $entityManager, AppUser::class, 15, 't.lastName');
		$pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));

		return $this->render('@ProntoMobile/users/app/index.html.twig',
			[
				'pageHelper' => $pageHelper
			]);
	}


	/**
	 * Show the details of a device
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function detailsAction(Request $request, EntityManagerInterface $entityManager, $identifier)
	{
		/** @var AppUser $user */
		$user = $entityManager->getRepository(AppUser::class)->findOneBy([
			'id'          => $identifier,
			'application' => $this->getApplication()
		]);

		if ($user === null) {
			// Redirect back, the user has no access to other app users
			return $this->redirectToRoute('pronto_mobile_app_users');
		}

		// Get the related notifications
		$pageHelper = new PageHelper($request, $entityManager, Device::class, 15, 't.lastLogin', 'DESC');
		$pageHelper->addClause(new WhereClause('t.appUser', $user));

		$userDTO = AppUserDTO::fromEntity($user);

		$form = $this->createForm(AppUserForm::class, $userDTO);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$userDTO = $form->getData();
			$user = $userDTO->toEntity($user ?? new AppUser());

			$entityManager->persist($user);
			$entityManager->flush();

			$this->addDataSavedFlash();
		}

		return $this->render('@ProntoMobile/users/app/details.html.twig', [
			'user'             => $user,
			'devicePageHelper' => $pageHelper,
			'userForm'         => $form->createView()
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
		$users = $entityManager->getRepository(AppUser::class)->findBy([
			'id'          => $request->get('users'),
			'application' => $this->getApplication()
		]);

		foreach ($users as $user) {
			$entityManager->remove($user);
		}

		$entityManager->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_app_users');
	}
}