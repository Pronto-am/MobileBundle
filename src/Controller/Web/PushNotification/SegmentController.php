<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web\PushNotification;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\PushNotification\Segment;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Utils\Doctrine\GroupClause;
use Pronto\MobileBundle\Utils\Doctrine\LeftJoinClause;
use Pronto\MobileBundle\Utils\Doctrine\SelectClause;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SegmentController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::PUSH_NOTIFICATIONS;
    }

    public function indexAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pageHelper = new PageHelper($request, $entityManager, Segment::class, 15);
        $pageHelper->addClause(new SelectClause(['t.id', 't.name', 'COUNT(d.id) AS deviceCount']));
        $pageHelper->addClause(new LeftJoinClause('t.deviceSegments', 's'));
        $pageHelper->addClause(new LeftJoinClause('s.device', 'd', 'with', 'd.tokenState = 1'));
        $pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));
        $pageHelper->addClause(new GroupClause('t.id'));

        return $this->render('@ProntoMobile/notifications/segments/index.html.twig', [
            'pageHelper' => $pageHelper
        ]);
    }

    public function editAction(Request $request, EntityManagerInterface $entityManager, Segment $segment = null): Response
    {
        $pageHelper = null;

        if ($segment !== null) {
            $pageHelper = new PageHelper($request, $entityManager, Device::class, 15, 't.lastLogin');
            $pageHelper->addClause(new LeftJoinClause('t.deviceSegments', 's'));
            $pageHelper->addClause(new WhereClause('s.segment', $segment));
            $pageHelper->addClause(new WhereClause('t.tokenState', true));
        }

        return $this->render('@ProntoMobile/notifications/segments/edit.html.twig', [
            'segment'    => $segment,
            'pageHelper' => $pageHelper
        ]);
    }

    public function saveAction(Request $request, EntityManagerInterface $entityManager, Segment $segment = null): RedirectResponse
    {
        // Create a new segment if it doesn't exist yet
        if ($segment === null) {
            $segment = new Segment();

            $application = $this->getApplication();

            $segment->setApplication($application);
        }

        $body = $request->request->all();

        $translations = [];

        // Save the plugin settings
        foreach ($body as $key => $value) {
            [$language, $field] = explode('_', $key);

            $translations[$language] = $value;
        }

        $segment->setName($translations);

        $entityManager->persist($segment);
        $entityManager->flush();

        $this->addDataSavedFlash();

        return $this->redirectToRoute('pronto_mobile_notification_segments');
    }

    public function deleteAction(Request $request, EntityManagerInterface $entityManager): RedirectResponse
    {
        $segments = $entityManager->getRepository(Segment::class)->findById($request->get('segments'));

        foreach ($segments as $segment) {
            $entityManager->remove($segment);
        }

        $entityManager->flush();

        $this->addDataRemovedFlash();

        return $this->redirectToRoute('pronto_mobile_notification_segments');
    }
}
