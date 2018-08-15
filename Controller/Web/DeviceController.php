<?php

namespace Pronto\MobileBundle\Controller\Web;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Device;
use Pronto\MobileBundle\Entity\Device\DeviceSegment;
use Pronto\MobileBundle\Entity\PushNotification\Recipient;
use Pronto\MobileBundle\Form\DeviceForm;
use Pronto\MobileBundle\Utils\Doctrine\LeftJoinClause;
use Pronto\MobileBundle\Utils\Doctrine\SelectClause;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Symfony\Component\HttpFoundation\Request;

class DeviceController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface
{
	/**
	 * Show a list of CMS users
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$pageHelper = new PageHelper($request, $entityManager, Device::class, 15, 't.lastLogin');
		$pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));
		$pageHelper->addClause(new WhereClause('t.tokenState', true));

		return $this->render('@ProntoMobile/devices/index.html.twig',
			[
				'pageHelper' => $pageHelper
			]);
	}


	/**
	 * Show the details of a device
	 *
	 * @param Request $request
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function detailsAction(Request $request, $identifier)
	{
		$entityManager = $this->getDoctrine()->getManager();

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

		$form = $this->createForm(DeviceForm::class, $device);

		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var Device $device */
			$device = $form->getData();

			$entityManager->persist($device);
			$entityManager->flush();

			$this->addDataSavedFlash();
		}

		return $this->render('@ProntoMobile/devices/details.html.twig', [
			'device'                  => $device,
			'notificationsPageHelper' => $pageHelper,
			'segments'                => $segments,
			'deviceForm'              => $form->createView()
		]);
	}


	/**
	 * Delete one or more devices
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

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