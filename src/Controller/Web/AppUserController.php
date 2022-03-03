<?php

declare(strict_types=1);

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
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppUserController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::APP_USERS;
    }

    public function indexAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pageHelper = new PageHelper($request, $entityManager, AppUser::class, 15, 't.lastName');
        $pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));

        return $this->render('@ProntoMobile/users/app/index.html.twig',
            [
                'pageHelper' => $pageHelper
            ]);
    }

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

    public function deleteAction(Request $request, EntityManagerInterface $entityManager): RedirectResponse
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
