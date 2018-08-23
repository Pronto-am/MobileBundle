<?php

namespace Pronto\MobileBundle\Controller\Web\PushNotification;

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
use Symfony\Component\HttpFoundation\Request;

class SegmentController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
	/**
	 * Check if the plugin is active
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::PUSH_NOTIFICATIONS;
	}


	/**
	 * Show a list of notification segments
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request)
	{
		$entityManager = $this->getDoctrine()->getManager();

		$pageHelper = new PageHelper($request, $entityManager, Segment::class, 15);
		$pageHelper->addClause(new SelectClause(['t.id', 't.name', 'COUNT(d.id) AS deviceCount']));
		$pageHelper->addClause(new LeftJoinClause('t.deviceSegments', 's'));
		$pageHelper->addClause(new LeftJoinClause('s.device', 'd', 'with', 'd.tokenState = 1'));
		$pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));
		$pageHelper->addClause(new GroupClause('t.id'));

		return $this->render('@ProntoMobile/notifications/segments/index.html.twig',
			[
				'pageHelper' => $pageHelper
			]);
	}


	/**
	 * Edit and save a push notification segment
	 *
	 * @param Request $request
	 * @param Segment|null $segment
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, Segment $segment = null)
	{
		$pageHelper = null;

		if ($segment !== null) {
			$entityManager = $this->getDoctrine()->getManager();

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


	/**
	 * Save a plugin
	 *
	 * @param Request $request
	 * @param Segment $segment
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function saveAction(Request $request, Segment $segment = null)
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
			list($language, $field) = explode('_', $key);

			$translations[$language] = $value;
		}

		$segment->setName($translations);

		$entityManager = $this->getDoctrine()->getManager();

		$entityManager->persist($segment);
		$entityManager->flush();

		$this->addDataSavedFlash();

		return $this->redirectToRoute('pronto_mobile_notification_segments');
	}


	/**
	 * Delete one or more segments
	 *
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request)
	{
		$em = $this->getDoctrine()->getManager();
		$segments = $em->getRepository(Segment::class)->findById($request->get('segments'));

		foreach ($segments as $segment) {
			$em->remove($segment);
		}

		$em->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_notification_segments');
	}
}