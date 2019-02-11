<?php

namespace Pronto\MobileBundle\Controller\Web\Application;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\Application\VersionDTO;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Form\Application\VersionForm;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class VersionController extends BaseController
{
	/**
	 * Edit a new or existing application version
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param null $id
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, EntityManagerInterface $entityManager, $id = null)
	{
		$application = $this->getApplication();

		$applicationVersion = $id !== null ? $entityManager->getRepository(Version::class)->find($id) : null;

		$versionDTO = VersionDTO::fromEntity($applicationVersion);
		$form = $this->createForm(VersionForm::class, $versionDTO);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$versionDTO = $form->getData();

			/** @var Version $applicationVersion */
			$applicationVersion = $versionDTO->toEntity($applicationVersion ?? new Version());
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
	 * @param EntityManagerInterface $entityManager
	 * @return JsonResponse
	 */
	public function deleteAction(Request $request, EntityManagerInterface $entityManager)
	{
		$id = $request->request->get('id');

		$version = $entityManager->getRepository(Version::class)->findOneBy([
			'id'          => $id,
			'application' => $this->getApplication()
		]);

		if ($version !== null) {
			/** @var Application $application */
			$application = $version->getApplication();

			if (count($application->getApplicationVersions()) === 1) {
				$response = new ErrorResponse([422, 'There has to be at least one version of an application']);

				return $response->create()->getJsonResponse();
			}

			$entityManager->remove($version);
			$entityManager->flush();

			$this->addDataRemovedFlash();

			// Check if the current item is the selected item
			if ($this->getApplicationVersion()->getId() === null) {
				// Let user choose a new application version
				$request->getSession()->remove(Version::SESSION_IDENTIFIER);

				$response = new SuccessResponse(['redirectUrl' => $this->generateAbsoluteUrl('pronto_mobile_select_application')]);
				return $response->create()->getJsonResponse();
			}

			$response = new SuccessResponse(['redirectUrl' => $this->generateAbsoluteUrl('pronto_mobile_applications')]);
			return $response->create()->getJsonResponse();
		}

		$response = new ErrorResponse([404, 'The ID does not exist']);
		return $response->create()->getJsonResponse();
	}
}