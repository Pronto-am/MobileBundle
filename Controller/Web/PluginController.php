<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\HttpFoundation\Request;

class PluginController extends BaseController implements ValidateApplicationSelectionInterface, ValidateCustomerSelectionInterface
{

	/**
	 * Show a list of CMS users
	 *
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(EntityManagerInterface $entityManager)
	{
		$plugins = $entityManager->getRepository(ApplicationPlugin::class)->findAllByApplication($this->getApplication());

		return $this->render('@ProntoMobile/plugins/index.html.twig',
			[
				'plugins' => $plugins
			]);
	}


	/**
	 * Edit a plugin
	 *
	 * @param Plugin $plugin
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Plugin $plugin, EntityManagerInterface $entityManager)
	{
		$applicationPlugin = $entityManager->getRepository(ApplicationPlugin::class)->findOneBy([
			'plugin'      => $plugin,
			'application' => $this->getApplication()
		]);

		$form = $this->createFormBuilder()->add('active', CheckboxType::class)->getForm();

		return $this->render('@ProntoMobile/plugins/edit.html.twig', [
			'form'              => $form->createView(),
			'applicationPlugin' => $applicationPlugin,
			'plugin'            => $plugin
		]);
	}


	/**
	 * Save a plugin
	 *
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param Plugin $plugin
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function saveAction(Request $request, EntityManagerInterface $entityManager, Plugin $plugin)
	{
		/** @var ApplicationPlugin $applicationPlugin */
		$applicationPlugin = $entityManager->getRepository(ApplicationPlugin::class)->findOneBy([
			'plugin'      => $plugin,
			'application' => $this->getApplication()
		]);

		// Don't continue when the plugin is not available
		if ($applicationPlugin === null) {
			return $this->redirectToRoute('pronto_mobile_plugins');
		}

		$body = $request->request->all();

		$applicationPlugin->setActive(array_key_exists('active', $body) && $body['active']);

		// Get the default config as a template for the fields that are required
		$config = $plugin->getDefaultConfig();

		foreach($config as $key => &$value) {
			switch($value['type']) {
				case 'checkbox':
					$value = isset($body[$key]);
					break;
				case 'json':
					$value = json_decode($body[$key]);
					break;
				default:
					$value = $body[$key];
			}
		}

		// Save the config
		$applicationPlugin->setConfig($config);

		$entityManager->persist($applicationPlugin);
		$entityManager->flush();

		$this->addDataSavedFlash();

		return $this->redirectToRoute('pronto_mobile_plugins');
	}
}