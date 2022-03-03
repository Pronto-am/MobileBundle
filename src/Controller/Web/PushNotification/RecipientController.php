<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web\PushNotification;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RecipientController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::PUSH_NOTIFICATIONS;
    }

    public function indexAction(Request $request, EntityManagerInterface $entityManager, $identifier, $sent)
    {
        $application = $this->getApplication();

        $notification = $entityManager->getRepository(PushNotification::class)->find($identifier);

        if ($notification === null || ($notification->getApplication()->getId() !== $application->getId()) || !is_numeric($sent)) {
            // Redirect back, the user has no access to other notifications
            return $this->redirectToRoute('pronto_mobile_notifications');
        }

        $pageHelper = new PageHelper($request, $entityManager, Recipient::class, 30, 't.sent', 'ASC', 't.sent');
        $pageHelper->addClause(new WhereClause('t.pushNotification', $notification));
        $pageHelper->addClause(new WhereClause('t.sent', $sent));

        return $this->render('@ProntoMobile/notifications/recipients/index.html.twig', [
            'notification' => $notification,
            'pageHelper'   => $pageHelper,
            'sent'         => $sent
        ]);
    }
}
