<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\ApplicationDTO;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;
use Pronto\MobileBundle\Form\ApplicationForm;
use Pronto\MobileBundle\Service\LanguagesLoader;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ApplicationController extends BaseController implements ValidateCustomerSelectionInterface
{
    public function indexAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pageHelper = new PageHelper($request, $entityManager, Application::class, 15, 't.name');
        $pageHelper->addClause(new WhereClause('t.customer', $this->getCustomer()));

        return $this->render('@ProntoMobile/applications/index.html.twig', [
            'pageHelper' => $pageHelper
        ]);
    }

    public function editAction(Request $request, LanguagesLoader $languagesLoader, EntityManagerInterface $entityManager, Application $application = null): Response
    {
        $customer = $this->getCustomer();

        // The user is not allowed to edit applications belonging to other customers
        if ($application !== null && $application->getCustomer()->getId() !== $customer->getId()) {
            return $this->redirectToRoute('pronto_mobile_applications');
        }

        $form = $this->createForm(ApplicationForm::class, ApplicationDTO::fromEntity($application), [
            'languages' => $languagesLoader,
            'locale'    => $request->getLocale()
        ]);

        if ($application === null) {
            $form->remove('clientId');
            $form->remove('clientSecret');
        }

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $application = $data->toEntity($application ?? new Application());

            $application->setCustomer($customer);

            $defaultLanguage = $form->get('defaultLanguage')->getData();

            $availableLanguages = $application->getAvailableLanguages();

            // Remove the default language from the available languages
            foreach ($availableLanguages as $key => $language) {
                if ($language->code === $defaultLanguage->code) {
                    unset($availableLanguages[$key]);
                    break;
                }
            }

            // Re-add the default language to make sure it's in the front
            $availableLanguages = array_merge([$defaultLanguage], $availableLanguages);

            $application->setAvailableLanguages(array_values($availableLanguages));

            $entityManager->persist($application);
            $entityManager->flush();

            $this->addDataSavedFlash();

            return $this->redirectToRoute('pronto_mobile_applications');
        }

        return $this->render('@ProntoMobile/applications/edit.html.twig', [
            'applicationForm' => $form->createView(),
            'application'     => $application
        ]);
    }

    public function deleteAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->request->getInt('id');

        $application = $entityManager->getRepository(Application::class)->find($id);

        // The user is not allowed to delete applications belonging to other customers
        if ($application !== null && $application->getCustomer()->getId() !== $this->getCustomer()->getId()) {
            return new JsonResponse([
                'error'       => true,
                'message'     => 'You are not allowed to delete applications belonging to other customers',
                'redirectUrl' => $this->generateUrl('pronto_mobile_applications', [], UrlGeneratorInterface::ABSOLUTE_URL)
            ]);
        }

        $entityManager->remove($application);
        $entityManager->flush();

        $this->addDataRemovedFlash();

        // Check if the current item is the selected item
        if ($this->prontoMobile->getApplication()->getId() === null) {
            // Let the user change the application version
            $request->getSession()->remove(Version::SESSION_IDENTIFIER);

            $response = new SuccessResponse(['redirectUrl' => $this->generateAbsoluteUrl('pronto_mobile_select_application')]);
            return $response->create()->getJsonResponse();
        }

        $response = new SuccessResponse(['redirectUrl' => $this->generateAbsoluteUrl('pronto_mobile_applications')]);
        return $response->create()->getJsonResponse();
    }

    public function selectApplicationAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $applications = $entityManager->getRepository(Application::class)->findByCustomer($this->getCustomer());

        // Get the target path the user intended to visit
        $targetPath = $request->getSession()->get('targetPath');

        $targetPath = $targetPath ?? $this->generateUrl('pronto_mobile_homepage');

        if (count($applications) === 0) {
            $request->getSession()->remove(Version::SESSION_IDENTIFIER);
            $request->getSession()->remove('targetPath');

            return new RedirectResponse($targetPath);
        }

        if (count($applications) === 1 && count($applications[0]->getApplicationVersions()) === 1) {
            /** @var Version $version */
            $version = $applications[0]->getApplicationVersions()[0];

            $request->getSession()->set(Version::SESSION_IDENTIFIER, $version->getId());
            $request->getSession()->remove('targetPath');

            return new RedirectResponse($targetPath);
        }

        return $this->render('@ProntoMobile/applications/applications.html.twig', [
            'applications' => $applications
        ]);
    }

    /**
     * @throws EntityNotFoundException
     */
    public function setApplicationAction(Request $request): JsonResponse
    {
        $id = $request->request->getInt('id');

        $request->getSession()->remove('targetPath');

        if ($id === null) {
            throw new EntityNotFoundException();
        }

        $response = new SuccessResponse(['url' => $this->generateAbsoluteUrl('pronto_mobile_homepage')]);

        $request->getSession()->set(Version::SESSION_IDENTIFIER, $id);

        return $response->create()->getJsonResponse();
    }
}
