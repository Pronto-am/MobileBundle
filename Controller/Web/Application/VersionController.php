<?php

namespace Pronto\MobileBundle\Controller\Web\Application;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Form\Application\VersionForm;
use Pronto\MobileBundle\Request\Application\VersionRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class VersionController extends BaseController
{

	/**
	 * Edit a new or existing application version
	 *
	 * @param Request $request
	 * @param null $id
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, $id = null)
	{
		$application = $this->getApplication();

		$entityManager = $this->getDoctrine()->getManager();

		$applicationVersion = $id !== null ? $entityManager->getRepository(Version::class)->find($id) : null;

		$versionRequest = VersionRequest::fromEntity($applicationVersion);

		$form = $this->createForm(VersionForm::class, $versionRequest);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var VersionRequest $versionRequest */
			$versionRequest = $form->getData();
			$applicationVersion = $versionRequest->toEntity($applicationVersion);

			$applicationVersion->setApplication($application);

			$entityManager->persist($applicationVersion);
			$entityManager->flush();

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_applications');
		}

		return $this->render('@ProntoMobile/applications/versions/edit.html.twig', [
			'applicationVersionForm' => $form->createView(),
			'version'                => $applicationVersion,
			'deletable'              => count($application->getApplicationVersions()) > 1
		]);
	}


	/**
	 * Delete an application version
	 *
	 * @param Request $request
	 * @return JsonResponse
	 * @throws \Psr\Cache\InvalidArgumentException
	 */
	public function deleteAction(Request $request)
	{
		$id = $request->request->get('id');

		$entityManager = $this->getDoctrine()->getManager();

		$version = $entityManager->getRepository(Version::class)->findOneBy([
			'id'          => $id,
			'application' => $this->getApplication()
		]);

		if ($version !== null) {
			/** @var Application $application */
			$application = $version->getApplication();

			if (count($application->getApplicationVersions()) === 1) {
				return new JsonResponse(['error' => true, 'message' => 'There has to be at least one version of an application']);
			}

			$entityManager->remove($version);
			$entityManager->flush();

			$this->addDataRemovedFlash();

			// Check if the current item is the selected item
			if ($this->getApplicationVersion()->getId() === null) {
				// Let user choose a new application version
				$request->getSession()->remove(Version::SESSION_IDENTIFIER);

				return new JsonResponse(['error' => false, 'redirectUrl' => $this->generateUrl('pronto_mobile_select_application', [], UrlGeneratorInterface::ABSOLUTE_URL)]);
			}

			return new JsonResponse(['error' => false, 'redirectUrl' => $this->generateUrl('pronto_mobile_applications', [], UrlGeneratorInterface::ABSOLUTE_URL)]);
		}

		return new JsonResponse(['error' => true, 'message' => 'The ID does not exist']);
	}
}