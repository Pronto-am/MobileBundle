<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\Collection\Property;


use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Repository\Collection\Property\TypeRepository;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class TypeController
 * @package Pronto\MobileBundle\Controller\Api\Vue\Collection\Property
 * @Route(path="collections/properties/types")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class TypeController extends ApiController
{
    /**
     * @var TypeRepository $types
     */
    private $types;

    /**
     * @param TypeRepository $types
     */
    public function __construct(TypeRepository $types)
    {
        $this->types = $types;
    }

    /**
     * @Route(methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $types = $this->types->list();
        return $this->response($types);
    }
}
