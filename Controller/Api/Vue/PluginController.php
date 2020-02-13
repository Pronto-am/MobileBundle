<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
use Pronto\MobileBundle\Repository\Application\PluginRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class PluginController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="plugins")
 * @IsGranted("ROLE_SUPER_ADMIN")
 */
class PluginController extends ApiController
{
    /**
     * @var PluginRepository $applicationPlugins
     */
    private $applicationPlugins;

    /**
     * PluginController constructor.
     * @param PluginRepository $applicationPlugins
     */
    public function __construct(PluginRepository $applicationPlugins)
    {
        $this->applicationPlugins = $applicationPlugins;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $plugins = $this->applicationPlugins->findAllByApplication($this->prontoMobile->getApplication());
        return $this->response($plugins);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     * @throws \Exception
     */
    public function getAction(int $id)
    {
        $plugin = $this->applicationPlugins->findOrFail($id);
        return $this->response($plugin);
    }

    /**
     * @Route(path="/", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function saveAction()
    {
        return JsonResponse::create(['data' => []]);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function deleteAction()
    {
        return JsonResponse::create(['data' => []]);
    }
}
