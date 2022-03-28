<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\DeviceDTO;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Device\DeviceSegment;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\Form\DeviceForm;
use Pronto\MobileBundle\Service\LanguagesLoader;
use Pronto\MobileBundle\Utils\Doctrine\LeftJoinClause;
use Pronto\MobileBundle\Utils\Doctrine\SelectClause;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DeviceController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface
{
    public function indexAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pageHelper = new PageHelper($request, $entityManager, Device::class, 15, 't.lastLogin');
        $pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));
        $pageHelper->addClause(new WhereClause('t.tokenState', true));

        return $this->render('@ProntoMobile/devices/index.html.twig',
            [
                'pageHelper' => $pageHelper
            ]);
    }

    public function detailsAction(
        Request $request,
        EntityManagerInterface $entityManager,
        LanguagesLoader $languagesLoader,
        $identifier
    ) {
        /** @var Device $device */
        $device = $entityManager->getRepository(Device::class)->findOneBy([
            'id'          => $identifier,
            'application' => $this->getApplication()
        ]);

        if ($device === null) {
            // Redirect back, the user has no access to other notifications
            return $this->redirectToRoute('pronto_mobile_devices');
        }

        // Get the related notifications
        $pageHelper = new PageHelper($request, $entityManager, Recipient::class, 15, 't.sent', 'ASC', 't.sent');
        $pageHelper->addClause(new SelectClause(['t', 'n']));
        $pageHelper->addClause(new LeftJoinClause('t.pushNotification', 'n'));
        $pageHelper->addClause(new WhereClause('t.device', $device));

        // Get the segments of the device
        $segments = $entityManager->getRepository(DeviceSegment::class)->findSegmentsByDevice($device);

        $deviceDTO = DeviceDTO::fromEntity($device);

        $form = $this->createForm(DeviceForm::class, $deviceDTO);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var DeviceDTO $deviceDTO */
            $deviceDTO = $form->getData();
            $device = $deviceDTO->toEntity($device);

            $entityManager->persist($device);
            $entityManager->flush();

            $this->addDataSavedFlash();
        }

        return $this->render('@ProntoMobile/devices/details.html.twig', [
            'device'                  => $device,
            'notificationsPageHelper' => $pageHelper,
            'segments'                => $segments,
            'languages'               => $languagesLoader,
            'deviceForm'              => $form->createView()
        ]);
    }

    public function deleteAction(Request $request, EntityManagerInterface $entityManager): RedirectResponse
    {
        $devices = $entityManager->getRepository(Device::class)->findBy([
            'id'          => $request->get('devices'),
            'application' => $this->getApplication()
        ]);

        foreach ($devices as $device) {
            $entityManager->remove($device);
        }

        $entityManager->flush();

        $this->addDataRemovedFlash();

        return $this->redirectToRoute('pronto_mobile_devices');
    }
}
