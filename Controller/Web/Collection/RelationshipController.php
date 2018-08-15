<?php

namespace Pronto\MobileBundle\Controller\Web\Collection;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Form\Collection\RelationshipForm;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Symfony\Component\HttpFoundation\Request;

class RelationshipController extends BaseController implements ValidatePluginStateInterface, ValidateApplicationSelectionInterface, ValidateCustomerSelectionInterface
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
	 * A fancy redirect to set the properties as active tab when navigating back
	 *
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function indexAction(string $identifier)
	{
		$this->addFlash('activeTab', 'relationships');

		return $this->redirectToRoute('pronto_mobile_collections_edit', ['identifier' => $identifier]);
	}


	/**
	 * Edit a collections relationship
	 *
	 * @param Request $request
	 * @param $identifier
	 * @param Collection\Relationship|null $relationship
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, $identifier, Collection\Relationship $relationship = null)
	{
		$entityManager = $this->getDoctrine()->getManager();

		/** @var Collection $collection */
		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $this->getApplicationVersion()
		]);

		// Redirect back when the collection doesn't exist
		if ($collection === null) {
			return $this->redirectToRoute('pronto_mobile_collections');
		}

		// Get a list off collections
		$collections = $entityManager->getRepository(Collection::class)->findBy([
			'applicationVersion' => $this->getApplicationVersion()
		]);

		// Get the relationship types
		$types = $entityManager->getRepository(Collection\Relationship\Type::class)->findAll();

		$form = $this->createForm(RelationshipForm::class, $relationship, [
			'collections' => $collections,
			'types'       => $types,
		]);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var Collection\Relationship $relationship */
			$relationship = $form->getData();

			$relationship->setCollection($collection);

			$entityManager->persist($relationship);
			$entityManager->flush();

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_collection_relationships', ['identifier' => $identifier]);
		}

		return $this->render('@ProntoMobile/collections/relationships/edit.html.twig', [
			'identifier'   => $identifier,
			'form'         => $form->createView(),
			'relationship' => $relationship
		]);
	}


	/**
	 * Save the relationship
	 *
	 * @param Request $request
	 * @param $identifier
	 * @param Collection\Relationship|null $relationship
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function saveAction(Request $request, $identifier, Collection\Relationship $relationship = null)
	{
		$entityManager = $this->getDoctrine()->getManager();

		/** @var Collection $collection */
		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $this->getApplicationVersion()
		]);

		// Redirect back when the collection doesn't exist
		if ($collection === null) {
			return $this->redirectToRoute('pronto_mobile_collections');
		}

		// Create a new entry if it doesn't exist yet
		if ($relationship === null) {
			$relationship = new Collection\Relationship();
			$relationship->setCollection($collection);
		}

		$entityManager->persist($relationship);
		$entityManager->flush();

		$this->addDataSavedFlash();

		return $this->redirectToRoute('pronto_mobile_collection_relationships', ['identifier' => $identifier]);
	}


	/**
	 * Delete one or multiple relationships
	 *
	 * @param Request $request
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request, $identifier)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$prontoMobile = $this->get('pronto_mobile.global.app');

		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $prontoMobile->getApplicationVersion()
		]);

		// Redirect when the collection doesn't exist
		if ($collection === null) {
			return $this->redirectToRoute('pronto_mobile_collections');
		}

		// Find relationships by id and the current collection
		$relationships = $entityManager->getRepository(Collection\Relationship::class)->findBy([
			'id'         => $request->get('relationships'),
			'collection' => $collection
		]);

		foreach ($relationships as $relationship) {
			$entityManager->remove($relationship);
		}

		$entityManager->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_collection_relationships', ['identifier' => $identifier]);
	}


	/**
	 * Edit the relation of an entry
	 *
	 * @param Request $request
	 * @param Collection\Entry $entry
	 * @param Collection\Relationship $relationship
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function editRelationshipsAction(Request $request, Collection\Entry $entry, Collection\Relationship $relationship)
	{
		$entityManager = $this->getDoctrine()->getManager();

		if ($relationship->getCollection()->getName() !== $entry->getCollection()->getName()) {
			return $this->redirectToRoute('pronto_mobile_collections');
		}

		// Get the related collection entries
		$entries = $entityManager->getRepository(Collection\Entry::class)->findBy([
			'collection' => $relationship->getRelatedCollection()
		]);

		// Get the properties of the collection for the tableview
		$properties = $entityManager->getRepository(Collection\Property::class)->findBy([
			'collection' => $relationship->getRelatedCollection()
		]);

		// Get the mapped relationships, to highlight the active ones
		$mapped = $entityManager->getRepository(Collection\Relationship\Mapper::class)->getAllRelatedEntryIds($entry->getId(), $relationship->getRelatedCollection());

		return $this->render('@ProntoMobile/collections/entries/relationships/edit.html.twig', [
			'relationship' => $relationship,
			'entries'      => $entries,
			'properties'   => $properties,
			'entry'        => $entry,
			'mapped'       => $mapped
		]);
	}


	/**
	 * Edit the relation of an entry
	 *
	 * @param Request $request
	 * @param Collection\Entry $entry
	 * @param Collection\Relationship $relationship
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function saveRelationshipsAction(Request $request, Collection\Entry $entry, Collection\Relationship $relationship)
	{
		$entityManager = $this->getDoctrine()->getManager();

		// Delete the old relationships
		$mappers = $entityManager->getRepository(Collection\Relationship\Mapper::class)->findBy([
			'entryLeft'         => $entry,
			'relatedCollection' => $relationship->getRelatedCollection()
		]);

		// Remove the former relationships
		foreach ($mappers as $mapper) {
			$entityManager->remove($mapper);
		}

		// Create the new relationships
		foreach ($request->request->get('entries', []) as $relatedEntry) {
			$mapper = new Collection\Relationship\Mapper();
			$mapper->setEntryLeft($entry);
			$mapper->setEntryRight($entityManager->getReference(Collection\Entry::class, $relatedEntry));
			$mapper->setRelatedCollection($relationship->getRelatedCollection());

			$entityManager->persist($mapper);
		}

		$entityManager->flush();

		return $this->redirectToRoute('pronto_mobile_collection_entries_edit', ['identifier' => $entry->getCollection()->getIdentifier(), 'id' => $entry->getId()]);
	}
}