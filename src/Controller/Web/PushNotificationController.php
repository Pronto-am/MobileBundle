<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\ORMException;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\PushNotificationDTO;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\PushNotificationForm;
use Pronto\MobileBundle\Repository\Application\PluginRepository;
use Pronto\MobileBundle\Repository\PushNotification\RecipientRepository;
use Pronto\MobileBundle\Repository\PushNotificationRepository;
use Pronto\MobileBundle\Service\JsonTranslator;
use Pronto\MobileBundle\Utils\Date;
use Pronto\MobileBundle\Utils\Doctrine\GroupClause;
use Pronto\MobileBundle\Utils\Doctrine\LeftJoinClause;
use Pronto\MobileBundle\Utils\Doctrine\SelectClause;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\Doctrine\WhereNotNullClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Pronto\MobileBundle\Utils\Responses\SuccessResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;

class PushNotificationController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::PUSH_NOTIFICATIONS;
    }

    public function indexAction(
        Request $request,
        EntityManagerInterface $entityManager
    ): Response {
        $application = $this->getApplication();

        $pageHelper = new PageHelper(
            request: $request,
            entityManager: $entityManager,
            entity: PushNotification::class,
            perPage: 15,
            sortField: 't.sent',
            sortOrder: 'DESC'
        );

        $pageHelper->addClause(new SelectClause([
            't AS notification',
            'COUNT(r.sent) AS devices',
            '(SELECT COUNT(r1.sent) FROM ' . Recipient::class . ' r1 WHERE r1.pushNotification = t AND r1.opened IS NOT NULL) AS opened',
            '(SELECT COUNT(r2.sent) FROM ' . Recipient::class . ' r2 WHERE r2.pushNotification = t AND r2.sent = 1) AS sent',
            '(SELECT COUNT(r3.sent) FROM ' . Recipient::class . ' r3 WHERE r3.pushNotification = t AND r3.sent = 0) AS failed'
        ]));
        $pageHelper->addClause(new LeftJoinClause('t.pushNotificationRecipients', 'r'));
        $pageHelper->addClause(new WhereClause('t.application', $application));
        $pageHelper->addClause(new WhereNotNullClause('t.sent'));
        $pageHelper->addClause(new GroupClause('t.id'));

        $scheduledNotifications = $entityManager->getRepository(PushNotification::class)->findBy([
            'sent'        => null,
            'application' => $application
        ]);

        return $this->render('@ProntoMobile/notifications/index.html.twig', [
            'pageHelper'             => $pageHelper,
            'scheduledNotifications' => $scheduledNotifications
        ]);
    }

    /**
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function editAction(
        JsonTranslator $jsonTranslator,
        EntityManagerInterface $entityManager,
        $identifier = null
    ): Response {
        $notification = null;

        if ($identifier !== null) {
            $notification = $entityManager->getRepository(PushNotification::class)->findOneBy([
                'id'          => $identifier,
                'application' => $this->getApplication()
            ]);

            // The user is not allowed to edit notifications belonging to other applications
            if ($notification === null) {
                return $this->redirectToRoute('pronto_mobile_notifications');
            }
        }

        // Check if the notification is already sent, because editing is then impossible
        if ($notification !== null && $notification->getSent() !== null && $notification->getScheduledSending() === null) {
            return $this->redirectToRoute('pronto_mobile_notifications_details', ['id' => $notification->getId()]);
        }

        $testDevices = $entityManager->getRepository(Device::class)->findRecipientsByApplication($this->getApplication(), true);

        $segments = $entityManager->getRepository(Segment::class)->findBy(['application' => $this->getApplication()]);

        $notificationDTO = PushNotificationDTO::fromEntity($notification);

        $form = $this->createForm(PushNotificationForm::class, $notificationDTO, [
            'segments'        => $segments,
            'json_translator' => $jsonTranslator,
            'entityManager'   => $entityManager
        ]);

        if (count($segments) === 0) {
            $form->remove('segment');
        }

        $config = $this->prontoMobile->getPluginConfiguration(Plugin::PUSH_NOTIFICATIONS);

        return $this->render('@ProntoMobile/notifications/edit.html.twig', [
            'notificationForm' => $form->createView(),
            'notification'     => $notification,
            'testDevices'      => $testDevices,
            'pluginConfig'     => $config
        ]);
    }

    /**
     * @throws ORMException
     */
    public function saveAction(
        Request $request,
        EntityManagerInterface $entityManager,
        UserInterface $user,
        $identifier = null
    ): RedirectResponse {
        $notification = null;

        if ($identifier !== null) {
            /** @var PushNotification $notification */
            $notification = $entityManager->getRepository(PushNotification::class)->find($identifier);
        }

        // Check if the notification is already sent, because editing is then impossible
        if ($notification !== null && $notification->getSent() !== null && $notification->getScheduledSending() === null) {
            return $this->redirectToRoute(
                route: 'pronto_mobile_notifications_details',
                parameters: ['id' => $notification->getId()]
            );
        }

        if ($notification === null) {
            $notification = new PushNotification();
        }

        $body = $request->request->all();

        $translations = [
            'title'          => [],
            'content'        => [],
            'clickActionUrl' => [],
        ];

        // Get the form data
        $form = $request->request->all('push_notification_form') ?? [];
        $form['testDevices'] = $body['testDevices'] ?? [];

        unset($body['testDevices'], $body['push_notification_form']);

        // Get the translated fields
        foreach ($body as $key => $value) {
            [$language, $field] = explode('_', $key);

            $translations[$field][$language] = $value;
        }

        // Add the click action to the form array
        $form['clickAction'] = array_values($translations['clickAction'])[0];

        // Remove click action from translations, it's a boolean
        unset($translations['clickAction']);

        foreach ($translations as $column => $translation) {
            $notification->{'set' . ucfirst($column)}($translation);
        }

        if (isset($form['segment']) && is_numeric($form['segment']) && $form['segment'] > 0) {
            $notification->setSegment($entityManager->getReference(Segment::class, $form['segment']));
        }

        if (isset($form['schedule'])) {
            $notification->setScheduledSending(Date::fromDateAndTime($form['scheduledSending']['date'], $form['scheduledSending']['time']));
        } else {
            $notification->setSent(new DateTime());
            $notification->setScheduledSending(new DateTime());
        }

        $notification->setApplication($this->getApplication());

        $notification->setClickAction((int)$form['clickAction']);

        $notification->setTest(isset($form['test']));

        if (isset($form['test'])) {
            $notification->setTestDevices($form['testDevices']);
        } else {
            $notification->setTestDevices([]);
        }

        $notification->setSentBy($user);

        $entityManager->persist($notification);
        $entityManager->flush();

        $this->addDataSavedFlash();

        return $this->redirectToRoute('pronto_mobile_notifications');
    }

    public function detailsAction(
        EntityManagerInterface $entityManager,
        $identifier
    ): Response {
        $notification = $entityManager->getRepository(PushNotification::class)->find($identifier);

        if ($notification === null || $notification->getApplication()->getId() !== $this->getApplication()->getId()) {
            // Redirect back, the user has no access to other notifications
            return $this->redirectToRoute('pronto_mobile_notifications');
        }

        /** @var RecipientRepository $recipientRepository */
        $recipientRepository = $entityManager->getRepository(Recipient::class);

        $bounced = $recipientRepository->getBounceCountByNotification($notification);
        $sent = $recipientRepository->getSuccessfulSentCountByNotification($notification);
        $opened = $recipientRepository->getOpenedCountByNotification($notification);

        $sentStatistics = [
            (int)$bounced,
            (int)$sent,
            (int)$opened
        ];

        $clickedStatistics = $recipientRepository
            ->getClickedCountByNotification($notification);

        $platformStatistics = $recipientRepository
            ->getSuccessfulSentCountByNotificationGroupByPlatform($notification);

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

        /** @var PluginRepository $applicationPluginRepository */
        $applicationPluginRepository = $entityManager->getRepository(ApplicationPlugin::class);
        /** @var ApplicationPlugin $plugin */
        $plugin = $applicationPluginRepository->findOneByApplicationAndIdentifier(
            application: $this->getApplication(),
            identifier: Plugin::PUSH_NOTIFICATIONS
        );

        $config = $plugin->getConfig();

        return $this->render('@ProntoMobile/notifications/details.html.twig', [
            'notification'       => $notification,
            'pluginConfig'       => $config,
            'sentStatistics'     => $sentStatistics,
            'clickStatistics'    => $clickedStatistics,
            'platformStatistics' => $platformStatistics
        ]);
    }

    public function recipientsAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $test = $request->request->getBoolean('test');
        $segment = $request->request->getInt('segment');
        $testDevices = $request->request->all('testDevices') ?? [];

        /** @var PushNotificationRepository $pushNotificationRepository */
        $pushNotificationRepository = $entityManager->getRepository(PushNotification::class);

        $recipients = $pushNotificationRepository->getRecipientCount(
            application: $this->getApplication(),
            segment: $segment,
            test: $test,
            testDevices: $testDevices
        );

        $response = new SuccessResponse([
            'recipients' => $recipients
        ]);

        return $response->create()->getJsonResponse();
    }
}
