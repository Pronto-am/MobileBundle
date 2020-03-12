<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Repository\DeviceRepository;
use Pronto\MobileBundle\Request\DeviceRequest;
use Pronto\MobileBundle\Request\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

/**
 * Class DeviceController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="devices")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class DeviceController extends ApiController
{
    private $devices;

    /**
     * LoginController constructor.
     * @param DeviceRepository $devices
     */
    public function __construct(DeviceRepository $devices)
    {
        $this->devices = $devices;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_USER")
     */
    public function paginateAction()
    {
        $paginated = $this->devices->paginate();
        return $this->paginatedResponse($paginated);
    }

    /**
     * @Route(path="/list", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $devices = $this->devices->list();
        return $this->response($devices, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_USER")
     * @param string $id
     * @return JsonResponse
     */
    public function getAction(string $id)
    {
        return $this->response($this->devices->findOrFail($id), [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param DeviceRequest $request
     * @return JsonResponse
     */
    public function saveAction(DeviceRequest $request)
    {
        /** @var Device $device */
        $device = $this->devices->findOrNew($request->get('id'));
        $device->setTestDevice($request->get('test_device', false));
        $this->devices->save($device);

        return $this->response($device, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->devices->delete($request->get('items'));
        return JsonResponse::create();
    }
}
