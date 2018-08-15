<?php

namespace Pronto\MobileBundle\Controller\Web;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Form\ApplicationForm;
use Pronto\MobileBundle\Service\LanguagesLoader;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ApplicationController extends BaseController
{
	/**
	 * Show a list of applications
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$pageHelper = new PageHelper($request, $entityManager, Application::class, 15, 't.name');
		$pageHelper->addClause(new WhereClause('t.customer', $this->getCustomer()));

		return $this->render('@ProntoMobile/applications/index.html.twig',
			[
				'pageHelper' => $pageHelper
			]);
	}


	/**
	 * Edit an applications' details
	 *
	 * @param Request $request
	 * @param Application|null $application
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, Application $application = null)
	{
		/** @var LanguagesLoader $languages */
		$languages = $this->get('pronto_mobile.global.languages_loader');

		$customer = $this->getCustomer();

		// The user is not allowed to edit applications belonging to other customers
		if ($application !== null && $application->getCustomer()->getId() !== $customer->getId()) {
			return $this->redirectToRoute('pronto_mobile_applications');
		}

		$form = $this->createForm(ApplicationForm::class, $application, [
			'languages' => $languages,
			'locale'    => $request->getLocale()
		]);

		if ($application === null) {
			$form->remove('clientId');
			$form->remove('clientSecret');
		}

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var Application $application */
			$application = $form->getData();

			$application->setCustomer($customer);

			$defaultLanguage = $form->get('defaultLanguage')->getData();

			$application->setDefaultLanguage($defaultLanguage->code);

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

			$entityManager = $this->getDoctrine()->getManager();
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


	/**
	 * Delete an application
	 *
	 * @param Request $request
	 * @return JsonResponse
	 * @throws \Psr\Cache\InvalidArgumentException
	 */
	public function deleteAction(Request $request)
	{
		$id = $request->request->getInt('id');

		$entityManager = $this->getDoctrine()->getManager();
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

		$prontoMobile = $this->get('pronto_mobile.global.app');

		// Check if the current item is the selected item
		if ($prontoMobile->getApplication()->getId() === null) {
			// Let the user change the application version
			$request->getSession()->remove(Version::SESSION_IDENTIFIER);

			return new JsonResponse(['error' => false, 'redirectUrl' => $this->generateUrl('pronto_mobile_select_application', [], UrlGeneratorInterface::ABSOLUTE_URL)]);
		}

		return new JsonResponse(['error' => false, 'redirectUrl' => $this->generateUrl('pronto_mobile_applications', [], UrlGeneratorInterface::ABSOLUTE_URL)]);
	}


	/**
	 * Let the user select an application from the list
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function selectApplicationAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

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

		return $this->render('@ProntoMobile/applications/applications.html.twig',
			[
				'applications' => $applications
			]);
	}


	/**
	 * Let the user select a customer from the list
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function setApplicationAction(Request $request)
	{
		$id = $request->request->getInt('id');

		$request->getSession()->remove('targetPath');

		if ($id !== null) {
			$response = new JsonResponse(['error' => false, 'url' => $this->generateUrl('pronto_mobile_homepage', [], UrlGeneratorInterface::ABSOLUTE_URL)]);

			$request->getSession()->set(Version::SESSION_IDENTIFIER, $id);
		} else {
			$response = new JsonResponse(['error' => true, 'message' => 'No Id present']);
		}

		return $response;
	}
}