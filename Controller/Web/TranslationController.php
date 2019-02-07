<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\Translation\UploadData;
use Pronto\MobileBundle\DTO\TranslationData;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\Translation\UploadForm;
use Pronto\MobileBundle\Form\TranslationForm;
use Pronto\MobileBundle\Service\LanguagesLoader;
use Pronto\MobileBundle\Service\Translation\Importer;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Translation\TranslatorInterface;

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
		$pageHelper = new PageHelper($request, $entityManager, TranslationKey::class, 15, 't.identifier');
		$pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));

		return $this->render('@ProntoMobile/translations/index.html.twig', [
			'pageHelper' => $pageHelper
		]);
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @param TranslationKey|null $key
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 */
	public function editAction(Request $request, EntityManagerInterface $entityManager, TranslationKey $key = null)
	{
		$data = TranslationData::fromEntity($key);

		// Default value of Android and iOS checkboxes
		if ($key === null) {
			$data->android = true;
			$data->ios = true;
		}

		$form = $this->createForm(TranslationForm::class, $data);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$key = $data->toEntity($key ?? new TranslationKey());
			$key->setApplication($this->getApplication());

			$entityManager->persist($key);
			$entityManager->flush();

			$translationRepository = $entityManager->getRepository(Translation::class);

			// Save the translations
			foreach ($request->request->get('translations') as $language => $text) {
				// Find or new
				$translation = $translationRepository->findOneBy([
						'translationKey' => $key,
						'language'       => $language
					]) ?? new Translation();

				$translation->setLanguage($language);
				$translation->setText($text);
				$translation->setTranslationKey($key);

				$entityManager->persist($translation);
			}

			$entityManager->flush();

			$this->addDataSavedFlash();

			return $this->redirectToRoute('pronto_mobile_translations');
		}

		if ($key !== null) {
			$translations = array_reduce($key->getTranslations()->getValues(), function ($result, Translation $translation) {
				$result[$translation->getLanguage()] = $translation->getText();

				return $result;
			}, []);
		} else {
			$translations = [];
		}

		return $this->render('@ProntoMobile/translations/edit.html.twig', [
			'form'         => $form->createView(),
			'key'          => $key,
			'translations' => $translations
		]);
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return ErrorResponse|JsonResponse
	 */
	public function saveInlineAction(Request $request, EntityManagerInterface $entityManager)
	{
		$translationKey = $entityManager->getRepository(TranslationKey::class)->find($request->request->get('translation_key_id'));

		if ($translationKey === null) {
			return new ErrorResponse([404, 'Invalid translation key']);
		}

		$translation = $entityManager->getRepository(Translation::class)->findOneBy([
			'translationKey' => $translationKey,
			'language'       => $request->request->get('language')
		]);

		if ($translation === null) {
			$translation = new Translation();
			$translation->setLanguage($request->request->get('language'))->setTranslationKey($translationKey);
		}

		$text = str_replace([
			'<br>', '<br/>', '<br />'
		], '\n', $request->request->get('text'));

		$translation->setText($text);

		$entityManager->persist($translation);
		$entityManager->flush();

		return new JsonResponse();
	}

	/**
	 * @param Request $request
	 * @param EntityManagerInterface $entityManager
	 * @return ErrorResponse|JsonResponse
	 */
	public function togglePlatformAction(Request $request, EntityManagerInterface $entityManager)
	{
		/** @var TranslationKey $translationKey */
		$translationKey = $entityManager->getRepository(TranslationKey::class)->find($request->request->get('translation_key_id'));

		if ($translationKey === null) {
			return new ErrorResponse([404, 'Invalid translation key']);
		}

		if ($request->request->get('platform') === 'android') {
			$translationKey->setAndroid($request->request->getBoolean('active'));
		} elseif ($request->request->get('platform') === 'ios') {
			$translationKey->setIos($request->request->getBoolean('active'));
		}

		$entityManager->persist($translationKey);
		$entityManager->flush();

		return new JsonResponse();
	}

	/**
	 * @param Request $request
	 * @param Importer $importer
	 * @param TranslatorInterface $translator
	 * @return Response
	 */
	public function uploadAction(Request $request, Importer $importer, TranslatorInterface $translator): Response
	{
		$uploadData = new UploadData();

		$form = $this->createForm(UploadForm::class, $uploadData, [
			'application' => $this->getApplication()
		]);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			/** @var File $file */
			$file = $uploadData->file;

			// Import the data
			if ($importer->import($file, $uploadData)) {
				$this->addDataSavedFlash();
			} else {
				$this->addFlash('danger', $translator->trans('translation.import_partly_failed'));
			}

			return $this->redirectToRoute('pronto_mobile_translations');
		}

		return $this->render('@ProntoMobile/translations/upload.html.twig', [
			'form' => $form->createView(),
		]);
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