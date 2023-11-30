<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web\Application;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\Application\VersionDTO;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Exceptions\Applications\OneVersionRequiredException;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;
use Pronto\MobileBundle\Form\Application\VersionForm;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class VersionController extends BaseController
{
    /**
     * @throws EntityNotFoundException
     */
    public function editAction(
        Request $request,
        EntityManagerInterface $entityManager,
        int $applicationId,
        $id = null
    ): Response {
        $application = $entityManager->getRepository(Application::class)->findOrFail($applicationId);

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
     * @throws EntityNotFoundException
     */
    public function deleteAction(
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $id = $request->request->get('id');

        $version = $entityManager->getRepository(Version::class)->findOneByOrFail([
            'id'          => $id,
            'application' => $this->getApplication()
        ]);

        /** @var Application $application */
        $application = $version->getApplication();

        if (count($application->getApplicationVersions()) === 1) {
            throw new OneVersionRequiredException();
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

}
