<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application\ApplicationPlugin;
use Pronto\MobileBundle\Entity\Plugin;
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
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * PluginController constructor.
     * @param EntityManagerInterface $entityManager
     * @throws \Exception
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function listAction()
    {
        $plugins = $this->entityManager->getRepository(ApplicationPlugin::class)->findAllByApplication($this->prontoMobile->getApplication());
        return $this->response($plugins);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     */
    public function getAction(int $id)
    {
        $plugin = $this->entityManager->getRepository(Plugin::class)->findOrFail($id);
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
