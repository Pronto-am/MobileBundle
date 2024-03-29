<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\CollectionDTO;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\CollectionForm;
use Pronto\MobileBundle\Service\FontAwesomeLoader;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CollectionController extends BaseController implements ValidatePluginStateInterface, ValidateApplicationSelectionInterface, ValidateCustomerSelectionInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::COLLECTIONS;
    }

    public function indexAction(EntityManagerInterface $entityManager): Response
    {
        $collections = $entityManager->getRepository(Collection::class)->findBy([
            'applicationVersion' => $this->getApplicationVersion()
        ], ['name' => 'ASC']);

        return $this->render('@ProntoMobile/collections/index.html.twig',
            [
                'collections' => $collections
            ]);
    }

    public function editAction(Request $request, FontAwesomeLoader $fontAwesomeLoader, EntityManagerInterface $entityManager, string $identifier = null)
    {
        if (!$this->isGranted('ROLE_SUPER_ADMIN')) {
            $this->addNoPermissionFlash();

            return $this->redirectToRoute('pronto_mobile_collections');
        }

        $applicationVersion = $this->getApplicationVersion();

        $collection = $entityManager->getRepository(Collection::class)->findOneBy([
            'applicationVersion' => $applicationVersion,
            'identifier'         => $identifier
        ]);

        // The user is not allowed to edit collections belonging to other customers
        if ($collection !== null && $collection->getApplicationVersion()->getId() !== $applicationVersion->getId()) {
            return $this->redirectToRoute('pronto_mobile_collections');
        }

        $originalIdentifier = $collection !== null ? $collection->getIdentifier() : '';

        $collectionDTO = CollectionDTO::fromEntity($collection);

        $form = $this->createForm(CollectionForm::class, $collectionDTO, [
            'fontAwesome' => $fontAwesomeLoader
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $collectionDTO = $form->getData();

            /** @var Collection $collection */
            $collection = $collectionDTO->toEntity($collection ?? new Collection());

            $collection->setApplicationVersion($applicationVersion);

            // Don't change the identifier when the collection already exists
            if ($collection->getId() !== null) {
                $collection->setIdentifier($originalIdentifier);
            }

            $entityManager->persist($collection);
            $entityManager->flush();

            $this->addDataSavedFlash();

            return $this->redirectToRoute('pronto_mobile_collections');
        }

        return $this->render('@ProntoMobile/collections/edit.html.twig', [
            'collectionForm' => $form->createView(),
            'collection'     => $collection,
        ]);
    }

    public function deleteAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->request->get('id');

        /** @var Collection $collection */
        $collection = $entityManager->getRepository(Collection::class)->find($id);

        // The user is not allowed to delete applications belonging to other customers
        if ($collection !== null && $collection->getApplicationVersion()->getId() !== $this->getApplicationVersion()->getId()) {
            return new JsonResponse([
                'error'       => true,
                'message'     => 'You are not allowed to delete collections beloning to other application versions',
                'redirectUrl' => $this->generateUrl('pronto_mobile_collections', [], UrlGeneratorInterface::ABSOLUTE_URL)
            ]);
        }

        $entityManager->remove($collection);
        $entityManager->flush();

        $this->addDataRemovedFlash();

        return new JsonResponse([
            'error'       => false,
            'redirectUrl' => $this->generateUrl('pronto_mobile_collections', [], UrlGeneratorInterface::ABSOLUTE_URL)
        ]);
    }
}
