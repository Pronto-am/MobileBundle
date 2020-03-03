<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Repository\PushNotificationRepository;
use Pronto\MobileBundle\Request\PushNotificationRequest;
use Pronto\MobileBundle\Request\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

/**
 * Class PushNotificationController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="notifications")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class PushNotificationController extends ApiController
{
    /**
     * @var PushNotificationRepository $pushNotifications
     */
    private $pushNotifications;

    /**
     * LoginController constructor.
     * @param PushNotificationRepository $pushNotifications
     */
    public function __construct(PushNotificationRepository $pushNotifications)
    {
        $this->pushNotifications = $pushNotifications;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->pushNotifications->paginate();
        $paginated->withNormalizers([
            new DateTimeNormalizer()
        ]);
        return $this->paginatedResponse($paginated);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param string $id
     * @return JsonResponse
     */
    public function getAction(string $id)
    {
        $notification = $this->pushNotifications->findOrFail($id);
        return $this->response($notification, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param PushNotificationRequest $request
     * @return JsonResponse
     */
    public function saveAction(PushNotificationRequest $request)
    {
        $notification = $this->pushNotifications->findOrFail($request->get('id'));

        // TODO: save

        return $this->response($notification, [
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
        $this->pushNotifications->delete($request->get('items'));
        return JsonResponse::create();
    }
}
