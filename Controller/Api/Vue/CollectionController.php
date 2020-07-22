<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Pronto\MobileBundle\Repository\CollectionRepository;
use Pronto\MobileBundle\Request\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class RemoteConfigController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="collections")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class CollectionController extends ApiController
{
    /**
     * @var CollectionRepository $collections
     */
    private $collections;

    /**
     * @param CollectionRepository $collections
     */
    public function __construct(CollectionRepository $collections)
    {
        $this->collections = $collections;
    }

    /**
     * @Route(methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->collections->paginate();
        return $this->paginatedResponse($paginated);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     */
    public function getAction(int $id)
    {
        return $this->response($this->collections->findOrFail($id));
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function saveAction()
    {
        return JsonResponse::create(['data' => []]);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->remoteConfig->delete($request->get('items'));

        return JsonResponse::create();
    }
}
