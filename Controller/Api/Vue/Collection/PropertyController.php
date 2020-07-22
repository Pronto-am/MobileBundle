<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\Collection;


use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Collection\Property;
use Pronto\MobileBundle\Repository\Collection\PropertyRepository;
use Pronto\MobileBundle\Repository\CollectionRepository;
use Pronto\MobileBundle\Request\Collection\PropertyRequest;
use Pronto\MobileBundle\Request\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class PropertyController
 * @package Pronto\MobileBundle\Controller\Api\Vue\Collection
 * @Route(path="collections/properties")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class PropertyController extends ApiController
{
    /**
     * @var PropertyRepository $properties
     */
    private $properties;

    /**
     * @param PropertyRepository $properties
     */
    public function __construct(PropertyRepository $properties)
    {
        $this->properties = $properties;
    }

    /**
     * @Route(path="/list", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $properties = $this->properties->list();
        return $this->response($properties);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param PropertyRequest $request
     * @return JsonResponse
     */
    public function saveAction(PropertyRequest $request)
    {
        $property = $this->properties->findOrNew($request->get('id'));
        $property = $this->serializer->deserialize(Property::class, $request->all(), $property);
        $this->properties->save($property);

        return $this->response($property);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->properties->delete($request->get('items'));

        return JsonResponse::create();
    }
}
