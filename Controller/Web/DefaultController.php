<?php

namespace Pronto\MobileBundle\Controller\Web;

use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;

class DefaultController extends BaseController implements ValidateCustomerSelectionInterface
{

	/**
	 * Dashboard view
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
    public function indexAction()
    {
		$entityManager = $this->getDoctrine()->getManager();

		$plugins = $entityManager->getRepository(ApplicationPlugin::class)->findAllByApplication($this->getApplication());

		return $this->render('@ProntoMobile/default/index.html.twig', [
			'plugins' => $plugins
		]);
    }
}
