<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class BaseController extends AbstractController
{
    protected ProntoMobile $prontoMobile;
    private TranslatorInterface $translator;

    public function __construct(TranslatorInterface $translator, ContainerInterface $container)
    {
        $this->prontoMobile = $container->get(ProntoMobile::class);
        $this->translator = $translator;
    }

    public function addDataSavedFlash(): void
    {
        $this->addFlashWithMessage($this->translator->trans('alert.success.data_saved'));
    }

    private function addFlashWithMessage($message, $type = 'success'): void
    {
        $this->addFlash(
            $type,
            sprintf($message)
        );
    }

    public function addDataRemovedFlash(): void
    {
        $this->addFlashWithMessage($this->translator->trans('alert.success.data_removed'));
    }

    public function addNoPermissionFlash(): void
    {
        $this->addFlashWithMessage($this->translator->trans('alert.warning.no_permission'), 'danger');
    }

    public function generateAbsoluteUrl(string $route, array $parameters = []): string
    {
        return $this->generateUrl($route, $parameters, UrlGeneratorInterface::ABSOLUTE_URL);
    }

    public function getCustomer(): ?Customer
    {
        return $this->prontoMobile->getCustomer();
    }

    public function getApplicationVersion(): ?Version
    {
        return $this->prontoMobile->getApplicationVersion();
    }

    public function getApplication(): ?Application
    {
        return $this->prontoMobile->getApplication();
    }
}
