<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\PushNotification;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Repository\PushNotification\SegmentRepository;
use Pronto\MobileBundle\Request\SegmentRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class SegmentController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="notifications/segments")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class SegmentController extends ApiController
{
    /**
     * @var SegmentRepository $segments
     */
    private $segments;

    /**
     * LoginController constructor.
     * @param SegmentRepository $segments
     */
    public function __construct(SegmentRepository $segments)
    {
        $this->segments = $segments;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $segments = $this->segments->paginate();
        return $this->paginatedResponse($segments);
    }

    /**
     * @Route(path="/list", methods={"GET"})
     * @IsGranted("ROLE_USER")
     */
    public function listAction()
    {
        $segments = $this->segments->list();
        return $this->response($segments);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     */
    public function getAction(int $id)
    {
        return $this->response($this->segments->findOrNew($id));
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param SegmentRequest $request
     * @return JsonResponse
     */
    public function saveAction(SegmentRequest $request)
    {
        $segment = $this->segments->findOrFail($request->get('id'));

        // TODO: save

        return $this->response($segment);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function deleteAction()
    {
        return JsonResponse::create(['data' => []]);
    }
}
