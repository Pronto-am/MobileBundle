<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\AppVersion;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class ApplicationController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="versions")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class AppVersionController extends ApiController
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * LoginController constructor.
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
    public function paginateAction()
    {
        $versions = $this->entityManager->getRepository(AppVersion::class)->findBy([
            'application' => $this->prontoMobile->getApplication()
        ]);

        return $this->response($versions);
    }

    /**
     * @Route(path="/{id}", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param int $id
     * @return JsonResponse
     */
    public function getAction(int $id)
    {
        return JsonResponse::create(['data' => []]);
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
