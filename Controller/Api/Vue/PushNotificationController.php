<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Repository\Application\PluginRepository;
use Pronto\MobileBundle\Repository\PushNotification\RecipientRepository;
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
     * @Route(methods={"GET"})
     * @IsGranted("ROLE_USER")
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
     * @Route(path="/list", methods={"GET"})
     * @IsGranted("ROLE_USER")
     */
    public function listAction()
    {
        $notifications = $this->pushNotifications->list();
        return $this->response($notifications, [
            new DateTimeNormalizer()
        ], ['PushNotificationDetailed']);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_USER")
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
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_USER")
     * @param PushNotificationRequest $request
     * @return JsonResponse
     */
    public function saveAction(PushNotificationRequest $request)
    {
        $notification = $this->pushNotifications->findOrNew($request->get('id'));
        $notification = $this->serializer->deserialize(PushNotification::class, $request->except(['scheduled']), $notification);

        dump($notification);
//        $this->pushNotifications->save($notification);

        return $this->response($notification, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/statistics/{id}", methods={"GET"})
     * @IsGranted("ROLE_USER")
     * @param string $id
     * @param RecipientRepository $recipients
     * @param PluginRepository $plugins
     * @return JsonResponse
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function statisticsAction(string $id, RecipientRepository $recipients, PluginRepository $plugins)
    {
        /** @var PushNotification $notification */
        $notification = $this->pushNotifications->findOrFail($id);

        $bounced = $recipients->getBounceCountByNotification($notification);
        $sent = $recipients->getSuccessfulSentCountByNotification($notification);
        $opened = $recipients->getOpenedCountByNotification($notification);

        $sentStatistics = [
            (int) $bounced,
            (int) $sent,
            (int) $opened
        ];

        $clickedStatistics = $recipients->getClickedCountByNotification($notification);
        $platformStatistics = $recipients->getSuccessfulSentCountByNotificationGroupByPlatform($notification);

        // Show en empty doughnut when the notification was sent to 0 devices
        if (empty($platformStatistics)) {
            $platformStatistics = [
                [
                    'platform' => 'ios',
                    'count'    => 0
                ], [
                    'platform' => 'android',
                    'count'    => 0
                ]
            ];
        }

        /** @var ApplicationPlugin $plugin */
        $plugin = $plugins->findOneByApplicationAndIdentifier($this->prontoMobile->getApplication(), Plugin::PUSH_NOTIFICATIONS);
        $config = $plugin->getConfig();

        return new JsonResponse([
            'data' => [
                'plugin_config' => $config,
                'sent'          => $sentStatistics,
                'click'         => $clickedStatistics,
                'platform'      => $platformStatistics
            ],
        ]);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_USER")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->pushNotifications->delete($request->get('items'));
        return JsonResponse::create();
    }
}
