<?php

namespace Pronto\MobileBundle\Controller\Web;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\BaseController;
use Pronto\MobileBundle\DTO\RemoteConfigDTO;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Pronto\MobileBundle\EventSubscriber\ValidateApplicationSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidateCustomerSelectionInterface;
use Pronto\MobileBundle\EventSubscriber\ValidatePluginStateInterface;
use Pronto\MobileBundle\Form\RemoteConfigForm;
use Pronto\MobileBundle\Utils\Doctrine\WhereClause;
use Pronto\MobileBundle\Utils\PageHelper;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RemoteConfigController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{

    /**
     * Check if the plugin is active
     *
     * @return string
     */
    public function getPluginIdentifier(): string
    {
        return Plugin::REMOTE_CONFIG;
    }

    /**
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request, EntityManagerInterface $entityManager)
    {
        $pageHelper = new PageHelper($request, $entityManager, RemoteConfig::class, 15);
        $pageHelper->addClause(new WhereClause('t.applicationVersion', $this->getApplicationVersion()));

        return $this->render('@ProntoMobile/config/index.html.twig', [
            'pageHelper' => $pageHelper
        ]);
    }

    /**
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     * @param AuthorizationCheckerInterface $authorizationChecker
     * @param RemoteConfig|null $configuration
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, EntityManagerInterface $entityManager, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker, RemoteConfig $configuration = null)
    {
        $configDTO = RemoteConfigDTO::fromEntity($configuration);

        $form = $this->createForm(RemoteConfigForm::class, $configDTO, [
            'translator'           => $translator,
            'authorizationChecker' => $authorizationChecker,
            'allow_extra_fields' => true,
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $configDTO = $form->getData();
            $formData = $request->request->get('remote_config_form');

            /** @var RemoteConfig $configuration */
            $configuration = $configDTO->toEntity($configuration ?? new RemoteConfig());
            $configuration->setApplicationVersion($this->getApplicationVersion());

            $configuration->setValue(null)->setJsonValue(null)->setOptions(null);

            switch ($configuration->getType()->getValue()) {
                case RemoteConfigType::JSON()->getValue():
                    $configuration->setJsonValue(json_decode($formData['value'][RemoteConfigType::JSON()->getValue()], true));
                    break;

                case RemoteConfigType::STRING()->getValue():
                    $configuration->setValue($formData['value'][$configuration->getType()->getValue()]);
                    break;

                case RemoteConfigType::INTEGER()->getValue():
                    $configuration->setValue($formData['value'][$configuration->getType()->getValue()]);
                    $configuration->setOptions($formData['options']['integer'] ?? []);
                    break;

                case RemoteConfigType::BOOL()->getValue():
                    $configuration->setValue(isset($formData['value'][$configuration->getType()->getValue()]) ? 1 : 0);
                    break;

                case RemoteConfigType::ENUM()->getValue():
                    $options = $formData['options']['enum'] ?? [];
                    $options['multiple'] = ($options['multiple'] ?? 0) === '1';

                    $configuration->setJsonValue($formData['value'][$configuration->getType()->getValue()] ?? null);
                    $configuration->setOptions($options);
                    break;
            }

            $entityManager->persist($configuration);
            $entityManager->flush();

            $this->addDataSavedFlash();

            return $this->redirectToRoute('pronto_mobile_remote_config');
        }

        return $this->render('@ProntoMobile/config/edit.html.twig', [
            'form'          => $form->createView(),
            'configuration' => $configuration
        ]);
    }

    /**
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return ErrorResponse|JsonResponse
     */
    public function togglePlatformAction(Request $request, EntityManagerInterface $entityManager)
    {
        /** @var RemoteConfig $configuration */
        $configuration = $entityManager->getRepository(RemoteConfig::class)->find($request->request->get('remote_config_id'));

        if ($configuration === null) {
            return new ErrorResponse([404, 'Invalid remote config key']);
        }

        if ($request->request->get('platform') === 'android') {
            $configuration->setAndroid($request->request->getBoolean('active'));
        } elseif ($request->request->get('platform') === 'ios') {
            $configuration->setIos($request->request->getBoolean('active'));
        }

        $entityManager->persist($configuration);
        $entityManager->flush();

        return new JsonResponse();
    }

    /**
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction(Request $request, EntityManagerInterface $entityManager): RedirectResponse
    {
        // Find users by id and the current customer
        $versions = $entityManager->getRepository(RemoteConfig::class)->findBy([
            'id'          => $request->get('items'),
            'application' => $this->getApplication()
        ]);

        foreach ($versions as $version) {
            $entityManager->remove($version);
        }

        $entityManager->flush();

        $this->addDataRemovedFlash();

        return $this->redirectToRoute('pronto_mobile_remote_config');
    }
}
