<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Pronto\MobileBundle\Repository\RemoteConfigRepository;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Serializer\EnumNormalizer;
use Pronto\MobileBundle\Serializer\RemoteConfigNormalizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class RemoteConfigController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="configurations")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class RemoteConfigController extends ApiController
{
    /**
     * @var RemoteConfigRepository $remoteConfig
     */
    private $remoteConfig;

    /**
     * LoginController constructor.
     * @param RemoteConfigRepository $remoteConfig
     */
    public function __construct(RemoteConfigRepository $remoteConfig)
    {
        $this->remoteConfig = $remoteConfig;
    }

    /**
     * @Route(methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->remoteConfig->paginate();
        $paginated->withNormalizers([
            new RemoteConfigNormalizer(),
            new EnumNormalizer(),
        ]);
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
        return JsonResponse::create(['data' => []]);
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
