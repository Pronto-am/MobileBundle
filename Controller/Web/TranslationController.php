<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TranslationController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
	/**
	 * Check if the plugin is active
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::TRANSLATIONS;
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request, EntityManagerInterface $entityManager): Response
	{
		$pageHelper = new PageHelper($request, $entityManager, TranslationKey::class, 15, 't.key');
		$pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));

		return $this->render('@ProntoMobile/translations/index.html.twig', [
			'pageHelper' => $pageHelper
		]);
	}

	/**
	 * @param TranslationKey|null $key
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(TranslationKey $key = null)
	{
		return $this->render('@ProntoMobile/translations/edit.html.twig', [
			'key' => $key
		]);
	}

	/**
	 * @param Request $request
	 */
	public function saveAction(Request $request)
	{
		//
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request, EntityManagerInterface $entityManager): RedirectResponse
	{
		$translations = $entityManager->getRepository(TranslationKey::class)->findBy([
			'id'          => $request->get('translations'),
			'application' => $this->getApplication()
		]);

		foreach ($translations as $translation) {
			$entityManager->remove($translation);
		}

		$entityManager->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_translations');
	}
}