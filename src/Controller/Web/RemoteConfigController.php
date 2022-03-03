<?php

declare(strict_types=1);

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
use Pronto\MobileBundle\Utils\Optional;
use Pronto\MobileBundle\Utils\PageHelper;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Contracts\Translation\TranslatorInterface;

class RemoteConfigController extends BaseController implements ValidateCustomerSelectionInterface, ValidateApplicationSelectionInterface, ValidatePluginStateInterface
{
    public function getPluginIdentifier(): string
    {
        return Plugin::REMOTE_CONFIG;
    }

    public function indexAction(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pageHelper = new PageHelper($request, $entityManager, RemoteConfig::class, 15);
        $pageHelper->addClause(new WhereClause('t.application', $this->getApplication()));

        return $this->render('@ProntoMobile/config/index.html.twig', [
            'pageHelper' => $pageHelper
        ]);
    }

    public function editAction(
        Request $request,
        EntityManagerInterface $entityManager,
        TranslatorInterface $translator,
        AuthorizationCheckerInterface $authorizationChecker,
        RemoteConfig $configuration = null
    ) {
        $configDTO = RemoteConfigDTO::fromEntity($configuration);

        if ($configuration !== null) {
            $configDTO->id = $configuration->getId();
        }

        $form = $this->createForm(RemoteConfigForm::class, $configDTO, [
            'translator'           => $translator,
            'authorizationChecker' => $authorizationChecker,
            'allow_extra_fields'   => true,
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $configDTO = $form->getData();
            $formData = $request->request->get('remote_config_form');

            /** @var RemoteConfig $configuration */
            $configuration = $configDTO->toEntity($configuration ?? new RemoteConfig());
            $configuration->setApplication($this->getApplication());

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

        /** @var FormError|null $valueError */
        $valueError = array_filter(iterator_to_array($form->getErrors()), function (FormError $error) {
                $violation = $error->getCause();

                if ($violation instanceof ConstraintViolation) {
                    return $violation->getPropertyPath() === 'data.value';
                }

                return false;
            })[0] ?? null;

        $valueError = Optional::get($valueError)->getMessage();

        return $this->render('@ProntoMobile/config/edit.html.twig', [
            'form'          => $form->createView(),
            'configuration' => $configuration,
            'valueError'    => $valueError
        ]);
    }

    public function togglePlatformAction(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        /** @var RemoteConfig $configuration */
        $configuration = $entityManager->getRepository(RemoteConfig::class)->findOrFail($request->request->get('remote_config_id'));

        if ($request->request->get('platform') === 'android') {
            $configuration->setAndroid($request->request->getBoolean('active'));
        } elseif ($request->request->get('platform') === 'ios') {
            $configuration->setIos($request->request->getBoolean('active'));
        }

        $entityManager->persist($configuration);
        $entityManager->flush();

        return new JsonResponse();
    }

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
