<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web\Collection;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\Collection\PropertyDTO;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Property;
use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;
use Pronto\MobileBundle\Form\Collection\PropertyForm;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\Translation\TranslatorInterface;

class PropertyController extends BaseController implements ValidatePluginStateInterface, ValidateApplicationSelectionInterface, ValidateCustomerSelectionInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::COLLECTIONS;
    }

    public function indexAction($identifier): RedirectResponse
    {
        $this->addFlash('activeTab', 'properties');

        return $this->redirectToRoute('pronto_mobile_collections_edit', ['identifier' => $identifier]);
    }

    public function editAction(EntityManagerInterface $entityManager, TranslatorInterface $translator, $identifier, Property $property = null): Response
    {
        $types = $entityManager->getRepository(Type::class)->findBy([], ['ordering' => 'asc']);

        // Get a list of collections for the related entity list
        $collections = $entityManager->getRepository(Collection::class)->findBy([
            'applicationVersion' => $this->getApplicationVersion()
        ]);

        // Create the form request from the entity
        $propertyDTO = PropertyDTO::fromEntity($property);
        $form = $this->createForm(PropertyForm::class, $propertyDTO, [
            'types'      => $types,
            'translator' => $translator,
        ]);

        /** @var Collection $collection */
        $collection = $property !== null ? $property->getCollection() : null;
        $editable = $collection !== null ? count($collection->getEntries()) === 0 : true;

        return $this->render('@ProntoMobile/collections/properties/edit.html.twig', [
            'propertyForm' => $form->createView(),
            'property'     => $property,
            'types'        => $types,
            'collections'  => $collections,
            'identifier'   => $identifier,
            'editable'     => $editable
        ]);
    }

    public function saveAction(Request $request, EntityManagerInterface $entityManager, $identifier, Property $property = null): RedirectResponse
    {
        $body = $request->request->all();

        // Get the form data
        $form = $request->request->get('property_form');

        $formType = $form['type'] ?? $property->getType()->getId();

        // Remove the form from the body, so only the fields are set
        unset($body['property_form']);

        /** @var Type $type */
        $type = $entityManager->getRepository(Type::class)->find($formType);

        /** @var Collection $collection */
        $collection = $entityManager->getRepository(Collection::class)->findOneBy([
            'identifier'         => $identifier,
            'applicationVersion' => $this->getApplicationVersion()
        ]);

        // Redirect back when the collection or type doesn't exist
        if ($collection === null || $type === null) {
            return $this->redirectToRoute('pronto_mobile_collection_properties', ['identifier' => $identifier]);
        }

        $config = $select = [];

        foreach ($body as $field => $value) {
            $field = explode('-', $field);

            if ((int) $formType !== (int) $field[1]) {
                continue;
            }

            // Check if we need to save select options instead of a regular field
            if (isset($field[3], $field[4])) {
                if (!isset($select[$field[4]])) {
                    $select[$field[4]] = [
                        'key'   => null,
                        'value' => null
                    ];
                }

                $select[$field[4]][$field[3]] = $value;
            } else {
                $config[$field[2]] = $value;
            }
        }

        // If the select isn't empty, add values to the config
        if (!empty($select)) {
            $select = array_values($select);

            $config = array_merge($config, ['values' => $select]);
        }

        // Check if checkbox values are present
        foreach ($type->getConfig() as $key => $value) {
            // Cast the checkbox value to booleans instead of 0 and 1
            if ($value['type'] === 'checkbox') {
                $config[$value['name']] = isset($config[$value['name']]);
            }
        }

        // Create a new property if it doesn't exist yet
        if ($property === null) {
            $property = new Property();
        }

        $property->setName($form['name']);

        // Don't change the identifier when the collection already exists
        if ($property->getId() === null) {
            $property->setIdentifier($form['identifier']);
        }

        $property->setType($type);
        $property->setCollection($collection);
        $property->setConfig($config);
        $property->setEditableForRole($form['editableForRole']);
        $property->setIncludeInListView(isset($form['includeInListView']) || $property->getEntryTitle());
        $property->setTranslatable(isset($form['translatable']));
        $property->setRequired(isset($form['required']));

        if ($property->getId() === null) {
            $property->setOrdering(count($collection->getProperties()));
        }

        $entityManager->persist($property);
        $entityManager->flush();

        $this->addDataSavedFlash();

        $this->addFlash('activeTab', 'properties');

        return $this->redirectToRoute('pronto_mobile_collections_edit', ['identifier' => $identifier]);
    }

    public function deleteAction(Request $request, EntityManagerInterface $entityManager, $identifier): RedirectResponse
    {
        $collection = $entityManager->getRepository(Collection::class)->findOneBy([
            'identifier'         => $identifier,
            'applicationVersion' => $this->getApplicationVersion()
        ]);

        // Redirect when the collection doesn't exist
        if ($collection === null) {
            $this->addNoPermissionFlash();

            return $this->redirectToRoute('pronto_mobile_collections');
        }

        // Find users by id and the current customer
        $properties = $entityManager->getRepository(Property::class)->findBy([
            'id'         => $request->get('properties'),
            'collection' => $collection
        ]);

        foreach ($properties as $property) {
            $entityManager->remove($property);
        }

        $entityManager->flush();

        $this->addDataRemovedFlash();

        $this->addFlash('activeTab', 'properties');

        return $this->redirectToRoute('pronto_mobile_collections_edit', ['identifier' => $identifier]);
    }

    public function orderAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $properties = $request->request->get('property');

        foreach ($properties as $key => $id) {
            /** @var Property $property */
            $property = $entityManager->getRepository(Property::class)->find($id);
            $property->setOrdering($key);

            $entityManager->persist($property);
        }

        $entityManager->flush();

        $response = new SuccessResponse([]);
        return $response->create()->getJsonResponse();
    }

    /**
     * @throws EntityNotFoundException
     */
    public function entryTitleAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->request->get('property_id');

        /** @var Property $property */
        $newProperty = $entityManager->getRepository(Property::class)->findOrFail($id);

        /** @var Collection $collection */
        $collection = $newProperty->getCollection();

        // Remove the entryTitle mark from all properties
        foreach ($collection->getProperties() as $property) {
            $property->setEntryTitle(false);
            $entityManager->persist($property);
        }

        // Set the selected property as the entry title
        $newProperty->setEntryTitle(true);
        $newProperty->setIncludeInListView(true);
        $entityManager->persist($newProperty);

        $entityManager->flush();

        $this->addFlash('activeTab', 'properties');

        $response = new SuccessResponse(['redirectUrl' => $this->generateAbsoluteUrl('pronto_mobile_collections_edit', ['identifier' => $collection->getIdentifier()])]);
        return $response->create()->getJsonResponse();
    }
}
