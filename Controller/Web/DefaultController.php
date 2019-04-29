<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;

class DefaultController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface
{
	/**
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(EntityManagerInterface $entityManager)
	{
		$plugins = $entityManager->getRepository(ApplicationPlugin::class)->findAllByApplication($this->getApplication());

		return $this->render('@ProntoMobile/default/index.html.twig', [
			'plugins' => $plugins
		]);
	}
}
