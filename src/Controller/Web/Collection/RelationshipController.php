<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web\Collection;

use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\Collection\RelationshipDTO;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Relationship;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\Collection\RelationshipForm;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Translation\TranslatorInterface;

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
     * @return RedirectResponse
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
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     * @param $identifier
     * @param Collection\Relationship|null $relationship
     * @return RedirectResponse|Response
     */
    public function editAction(Request $request, EntityManagerInterface $entityManager, TranslatorInterface $translator, $identifier, Collection\Relationship $relationship = null)
    {
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
        $types = $entityManager->getRepository(Relationship\Type::class)->findAll();

        $relationshipDTO = RelationshipDTO::fromEntity($relationship);

        $form = $this->createForm(RelationshipForm::class, $relationshipDTO, [
            'collections' => $collections,
            'types'       => $types,
            'translator'  => $translator,
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var RelationshipDTO $relationshipDTO */
            $relationshipDTO = $form->getData();
            $relationship = $relationshipDTO->toEntity($relationship ?? new Relationship());

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
     * @param EntityManagerInterface $entityManager
     * @param $identifier
     * @param Collection\Relationship|null $relationship
     * @return RedirectResponse
     */
    public function saveAction(EntityManagerInterface $entityManager, $identifier, Collection\Relationship $relationship = null)
    {
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
     * @param EntityManagerInterface $entityManager
     * @param $identifier
     * @return RedirectResponse
     */
    public function deleteAction(Request $request, EntityManagerInterface $entityManager, $identifier)
    {
        $collection = $entityManager->getRepository(Collection::class)->findOneBy([
            'identifier'         => $identifier,
            'applicationVersion' => $this->prontoMobile->getApplicationVersion()
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
     * @param EntityManagerInterface $entityManager
     * @param Collection\Entry $entry
     * @param Collection\Relationship $relationship
     * @return RedirectResponse|Response
     * @throws DBALException
     */
    public function editRelationshipsAction(EntityManagerInterface $entityManager, Collection\Entry $entry, Collection\Relationship $relationship)
    {
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
     * @param EntityManagerInterface $entityManager
     * @param Collection\Entry $entry
     * @param Collection\Relationship $relationship
     * @return RedirectResponse|Response
     * @throws ORMException
     */
    public function saveRelationshipsAction(Request $request, EntityManagerInterface $entityManager, Collection\Entry $entry, Collection\Relationship $relationship)
    {
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
