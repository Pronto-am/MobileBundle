<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\AppVersionDTO;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\AppVersionForm;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\Optional;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class AppVersionController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{

	/**
	 * Check if the plugin is active
	 *
	 * @return string
	 */
	public function getPluginIdentifier(): string
	{
		return Plugin::APP_VERSIONS;
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction(Request $request, EntityManagerInterface $entityManager)
	{
		$pageHelper = new PageHelper($request, $entityManager, AppVersion::class, 15, 't.releaseDate');
		$pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));

		return $this->render('@ProntoMobile/versions/index.html.twig', [
			'pageHelper' => $pageHelper
		]);
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param AppVersion|null $version
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, EntityManagerInterface $entityManager, AppVersion $version = null)
	{
		$originalFileName = Optional::get($version)->getFileName();

		$versionDTO = AppVersionDTO::fromEntity($version);

		if ($version === null) {
			$versionDTO->description = [];
		}

		foreach ($this->getApplication()->getAvailableLanguages() as $language) {
			$versionDTO->description[$language['code']] = $versionDTO->description[$language['code']] ?? '';
		}

		$form = $this->createForm(AppVersionForm::class, $versionDTO);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$versionDTO = $form->getData();

			/** @var AppVersion $version */
			$version = $versionDTO->toEntity($version ?? new AppVersion());
			$version->setApplication($this->getApplication());

			// Keep the original file when no new file has been uploaded
			if ($originalFileName !== null && $versionDTO->file === null) {
				$version->setFileName($originalFileName);
			} elseif ($versionDTO->file !== null) {
				$version->setFileName($versionDTO->file);
			}

			$entityManager->persist($version);
			$entityManager->flush();

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_app_versions');
		}

		return $this->render('@ProntoMobile/versions/edit.html.twig', [
			'form'    => $form->createView(),
			'version' => $version
		]);
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function deleteAction(Request $request, EntityManagerInterface $entityManager): RedirectResponse
	{
		// Find users by id and the current customer
		$versions = $entityManager->getRepository(AppVersion::class)->findBy([
			'id'          => $request->get('versions'),
			'application' => $this->getApplication()
		]);

		foreach ($versions as $version) {
			$entityManager->remove($version);
		}

		$entityManager->flush();

		$this->addDataRemovedFlash();

		return $this->redirectToRoute('pronto_mobile_app_versions');
	}
}
