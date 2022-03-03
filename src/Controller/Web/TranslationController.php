<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\Translation\UploadDTO;
use Pronto\MobileBundle\DTO\TranslationDTO;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Exceptions\EntityNotFoundException;
use Pronto\MobileBundle\Form\Translation\UploadForm;
use Pronto\MobileBundle\Form\TranslationForm;
use Pronto\MobileBundle\Service\JsonSerializer;
use Pronto\MobileBundle\Service\Translation\Importer;
use Pronto\MobileBundle\Utils\Collect;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\Optional;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\Translation\TranslatorInterface;

class TranslationController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::TRANSLATIONS;
    }

    public function indexAction(Request $request, EntityManagerInterface $entityManager, JsonSerializer $jsonSerializer): Response
    {
        if ($request->isXmlHttpRequest()) {
            $translations = $entityManager->getRepository(TranslationKey::class)->getList(
                $this->getApplication(),
                $request->query->get('search'),
                $request->query->get('order'),
                (int) $request->query->get('page', 1)
            );

            $translationCount = $entityManager->getRepository(TranslationKey::class)->getCount(
                $this->getApplication()
            );

            return new JsonResponse([
                'data'       => json_decode($jsonSerializer->serialize($translations)),
                'pagination' => [
                    'total'        => $translationCount,
                    'current_page' => (int) $request->query->get('page', 1),
                    'total_pages'  => ceil($translationCount / 100),
                ]
            ]);
        }

        return $this->render('@ProntoMobile/translations/index.html.twig');
    }

    public function editAction(Request $request, EntityManagerInterface $entityManager, TranslationKey $key = null)
    {
        $data = TranslationDTO::fromEntity($key);

        // Default value of Android and iOS checkboxes
        if ($key === null) {
            $data->android = true;
            $data->ios = true;
        } else {
            $data->id = $key->getId();
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
     * @throws EntityNotFoundException
     */
    public function saveInlineAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $translationKey = $entityManager->getRepository(TranslationKey::class)->findOrFail($request->request->get('translation_key_id'));

        $translation = $entityManager->getRepository(Translation::class)->findOneBy([
            'translationKey' => $translationKey,
            'language'       => $request->request->get('language')
        ]);

        if ($translation === null) {
            $translation = new Translation();
            $translation->setLanguage($request->request->get('language'))->setTranslationKey($translationKey);
        }

        $translation->setText($request->request->get('text'));

        $entityManager->persist($translation);
        $entityManager->flush();

        return new JsonResponse();
    }

    /**
     * @throws EntityNotFoundException
     */
    public function togglePlatformAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        /** @var TranslationKey $translationKey */
        $translationKey = $entityManager->getRepository(TranslationKey::class)->findOrFail($request->request->get('translation_key_id'));

        if ($request->request->get('platform') === 'android') {
            $translationKey->setAndroid($request->request->getBoolean('active'));
        } elseif ($request->request->get('platform') === 'ios') {
            $translationKey->setIos($request->request->getBoolean('active'));
        }

        $entityManager->persist($translationKey);
        $entityManager->flush();

        return new JsonResponse();
    }

    public function uploadAction(Request $request, Importer $importer, TranslatorInterface $translator): Response
    {
        $uploadData = new UploadDTO();

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

    public function exportAction(EntityManagerInterface $entityManager, ContainerInterface $container): Response
    {
        $translationKeys = $entityManager->getRepository(TranslationKey::class)->findBy([
            'application' => $this->getApplication()
        ]);

        $availableLanguages = $this->prontoMobile->getApplication()->getAvailableLanguages();

        $headers = ['key', 'type', 'description', 'android', 'ios'];

        foreach ($availableLanguages as $language) {
            $headers[] = ucfirst($language['nativeName']) . ' (' . $language['code'] . ')';
        }

        $languageCodes = array_reduce($availableLanguages, function ($result, $language) {
            $result[] = $language['code'];

            return $result;
        }, []);

        $rows = [];
        $rows[] = implode(';', $headers);

        foreach ($translationKeys as $key => $translationKey) {

            $translations = Collect::keyBy($translationKey->getTranslations()->toArray(), 'language');

            $fields = [
                $translationKey->getIdentifier(),
                $translationKey->getType(),
                $translationKey->getDescription(),
                $translationKey->isAndroid(),
                $translationKey->isIos()
            ];

            foreach ($languageCodes as $languageCode) {
                $text = isset($translations[$languageCode]) ? $translations[$languageCode]->getText() : null;
                $fields[] = $text !== ' ' && !empty($text) ? $text : '';
            }

            $rows[] = implode(';', $fields);
        }

        $response = new Response(implode("\r\n", $rows));
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename=' . date('Y-m-d') . ' ' . $this->prontoMobile->getApplication()->getName() . '.csv');

        return $response;
    }

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
