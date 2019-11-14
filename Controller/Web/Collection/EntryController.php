<?php

namespace Pronto\MobileBundle\Controller\Web\Collection;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Twig\IsGrantedMinimal;
use Pronto\MobileBundle\Utils\Collection\EntryParser;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Service\Collection\EntryValueParser;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class EntryController extends BaseController implements ValidatePluginStateInterface, ValidateApplicationSelectionInterface, ValidateCustomerSelectionInterface
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
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(EntityManagerInterface $entityManager, $identifier)
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

		// Get the entries
		$entries = $entityManager->getRepository(Collection\Entry::class)->findBy([
			'collection' => $collection
		]);

		// Get the properties of the collection
		$properties = $collection->getProperties();

		$listviewProperties = array_filter($properties->getValues(), function ($property) {
			/** @var Collection\Property $property */
			return $property->getIncludeInListView();
		});

		// Get the property that serves as an entry title
		$entryTitleProperty = array_filter($properties->getValues(), function ($property) {
			/** @var Collection\Property $property */
			return $property->getEntryTitle();
		});

		return $this->render('@ProntoMobile/collections/entries/index.html.twig', [
			'entries'       => $entries,
			'collection'    => $collection,
			'properties'    => $listviewProperties,
			'hasEntryTitle' => \count($entryTitleProperty) === 1
		]);
	}


    /**
     * Edit a collection entry
     *
     * @param EntryValueParser $entryValueParser
     * @param EntityManagerInterface $entityManager
     * @param $identifier
     * @param Collection\Entry|null $entry
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     * @throws \Doctrine\DBAL\DBALException
     */
	public function editAction(EntryValueParser $entryValueParser, EntityManagerInterface $entityManager, $identifier, Collection\Entry $entry = null)
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

		$properties = $entityManager->getRepository(Collection\Property::class)->findAllByCollection($collection);
		$translatableProperties = $entityManager->getRepository(Collection\Property::class)->findAllByCollection($collection, true);

		// Get the relationships of this collection
		$relationships = $entityManager->getRepository(Collection\Relationship::class)->findBy([
			'collection' => $collection
		]);

		$related = [];

		// Get the names of the related entries
		if ($entry !== null) {
			/** @var Collection\Relationship $relationship */
			foreach ($relationships as $relationship) {
				// Get the id's of the related entries
				$mappedRelationships = $entityManager->getRepository(Collection\Relationship\Mapper::class)->getAllRelatedEntryIds($entry->getId(), $relationship->getRelatedCollection());

				// Get the full entry objects by id's
				$relatedEntries = $entityManager->getRepository(Collection\Entry::class)->getWhereIdIn($mappedRelationships);

				// Get the entry title property of the collection
				[$entryTitleProperty] = array_filter($relationship->getRelatedCollection()->getProperties()->getValues(), function ($property) {
					/** @var Collection\Property $property */
					return $property->getEntryTitle();
				});

				$related = array_reduce($relatedEntries, function ($result, $entry) use ($relationship, $entryTitleProperty, $entryValueParser) {
					/**
					 * @var Collection\Entry $entry
					 * @var Collection\Property $entryTitleProperty
					 */
					$value = $entry['data'][$entryTitleProperty->getIdentifier()];

					$result[$relationship->getRelatedCollection()->getId()][] = $entryValueParser->parse($entryTitleProperty, $value);

					return $result;
				}, $related);
			}
		}

		return $this->render('@ProntoMobile/collections/entries/edit.html.twig', [
			'translatableProperties' => $translatableProperties,
			'properties'             => $properties,
			'identifier'             => $identifier,
			'relationships'          => $relationships,
			'entry'                  => $entry,
			'related'                => $related
		]);
	}


    /**
     * Save the entry
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param IsGrantedMinimal $isGranted
     * @param $identifier
     * @param Collection\Entry|null $entry
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
	public function saveAction(Request $request, EntityManagerInterface $entityManager, IsGrantedMinimal $isGranted, $identifier, Collection\Entry $entry = null)
	{
		/** @var Collection $collection */
		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $this->getApplicationVersion()
		]);

		$properties = $entityManager->getRepository(Collection\Property::class)->findBy([
			'collection' => $collection
		]);

        // Get the logged in user
        $user = $this->getUser();

        $redirectToEditView = $entry === null;

        // Create a new entry if it doesn't exist yet
        if ($entry === null) {
            $entry = new Collection\Entry();
            $entry->setCollection($collection);
            $entry->setCreatedBy($user);
        }

		// Create a new entry parser with the form data
		$entryParser = new EntryParser($request);
        $entryParser->setInitialData($entry->getData());

		// Add the properties of the collection to the parser
		foreach ($properties as $property) {
		    // Check if the user has the minimal required role to edit this property
            if(!$isGranted->isGrantedMinimal($property->editableForRole())) {
                continue;
            }

			$entryParser->addProperty($property);
		}

		$entry->setData($entryParser->getEntryObject());
		$entry->setUpdatedBy($user);
		$entry->setActive($request->request->get('active') !== null);

		$entityManager->persist($entry);
		$entityManager->flush();

		$this->addDataSavedFlash();

		// Redirect back when it's a new entry and it has relationships
		if ($redirectToEditView && \count($collection->getRelationships()) > 0) {
			$this->redirectToRoute('pronto_mobile_collection_entries_edit', ['identifier' => $identifier, 'id' => $entry->getId()]);
		}

		return $this->redirectToRoute('pronto_mobile_collection_entries', ['identifier' => $identifier]);
	}


	/**
	 * Delete one or multiple properties
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param $identifier
	 * @param $id
	 * @return JsonResponse
	 */
	public function deleteFileAction(Request $request, EntityManagerInterface $entityManager, $identifier, $id)
	{
		$filename = $request->request->get('filename');
		$property = $request->request->get('property');

		/** @var Collection $collection */
		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $this->prontoMobile->getApplicationVersion()
		]);

		/** @var Collection\Entry $entry */
		$entry = $entityManager->getRepository(Collection\Entry::class)->find($id);

		// Redirect when the collection doesn't exist
		if ($collection === null || $entry === null) {
			$response = new ErrorResponse([403, 'Not authorized to perform this request']);
			return $response->create()->getJsonResponse();
		}

		$data = $entry->getData();

		// Remove the file from the entry
		foreach ($data[$property] as $key => $file) {
			if ($file === $filename) {
				unset($data[$property][$key]);
			}
		}

		$data[$property] = array_values($data[$property]);

		$uploadsFolder = $this->prontoMobile->getConfiguration('uploads_folder', 'uploads');

		// Delete the file from the uploads directory
		$filesystem = new Filesystem();
		$filesystem->remove($uploadsFolder . '/collections/' . $collection->getIdentifier() . '/' . $filename);

		// Save the entry again
		$entry->setData($data);

		$entityManager->persist($entry);
		$entityManager->flush();

		$response = new SuccessResponse([]);
		return $response->create()->getJsonResponse();
	}


	/**
	 * Delete one or multiple entries
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request, EntityManagerInterface $entityManager, $identifier)
	{
		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $this->prontoMobile->getApplicationVersion()
		]);

		// Redirect when the collection doesn't exist
		if ($collection === null) {
			$this->addNoPermissionFlash();

			return $this->redirectToRoute('pronto_mobile_collection_entries');
		}

		// Find users by id and the current customer
		$entries = $entityManager->getRepository(Collection\Entry::class)->findBy([
			'id'         => $request->get('entries'),
			'collection' => $collection
		]);

		foreach ($entries as $entry) {
			$entityManager->remove($entry);
		}

		$entityManager->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_collection_entries', ['identifier' => $identifier]);
	}
}
