<?php


namespace Pronto\MobileBundle\Traits;


use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;

trait UseBundleConfiguration
{
    /**
     * @var ProntoMobile $prontoMobile
     */
    protected $prontoMobile;

    /**
     * @required
     * @param ContainerInterface $container
     */
    public function setProntoMobile(ContainerInterface $container): void
    {
        $this->prontoMobile = $container->get('pronto_mobile.global.app');
    }
}
