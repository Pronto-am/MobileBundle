<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Form\CollectionForm;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Service\FontAwesomeLoader;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CollectionController extends BaseController implements ValidatePluginStateInterface, ValidateApplicationSelectionInterface, ValidateCustomerSelectionInterface
{

	/**
	 * Check if the plugin is active
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::COLLECTIONS;
	}


	/**
	 * Show a list of collections
	 *
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(EntityManagerInterface $entityManager)
	{
		$collections = $entityManager->getRepository(Collection::class)->findBy([
			'applicationVersion' => $this->getApplicationVersion()
		], ['name' => 'ASC']);

		return $this->render('@ProntoMobile/collections/index.html.twig',
			[
				'collections' => $collections
			]);
	}


	/**
	 * Edit a collection
	 *
	 * @param Request $request
	 * @param FontAwesomeLoader $fontAwesomeLoader
	 * @param EntityManagerInterface $entityManager
	 * @param Collection $collection
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, FontAwesomeLoader $fontAwesomeLoader, EntityManagerInterface $entityManager, Collection $collection = null)
	{
		if(!$this->isGranted('ROLE_SUPER_ADMIN')) {
			$this->addNoPermissionFlash();

			return $this->redirectToRoute('pronto_mobile_collections');
		}

		$applicationVersion = $this->getApplicationVersion();

		// The user is not allowed to edit collections belonging to other customers
		if ($collection !== null && $collection->getApplicationVersion()->getId() !== $applicationVersion->getId()) {
			return $this->redirectToRoute('pronto_mobile_collections');
		}

		$originalIdentifier = $collection !== null ? $collection->getIdentifier() : '';

		$form = $this->createForm(CollectionForm::class, $collection, [
			'fontAwesome' => $fontAwesomeLoader
		]);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$collection = $form->getData();

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


	/**
	 * Delete a collection
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return JsonResponse
	 */
	public function deleteAction(Request $request, EntityManagerInterface $entityManager)
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