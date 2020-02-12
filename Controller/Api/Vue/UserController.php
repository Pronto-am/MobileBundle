<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class UserController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="users")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class UserController extends ApiController
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
     * @Route(path="/", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $users = $this->entityManager->getRepository(User::class)->findBy([
            'customer' => $this->prontoMobile->getCustomer()
        ]);

        return $this->response($users);
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
