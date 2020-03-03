<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Repository\TranslationKeyRepository;
use Pronto\MobileBundle\Request\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class TranslationController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="applications")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class TranslationController extends ApiController
{
    /**
     * @var TranslationKeyRepository $translationKeys
     */
    private $translationKeys;

    /**
     * LoginController constructor.
     * @param TranslationKeyRepository $translationKeys
     */
    public function __construct(TranslationKeyRepository $translationKeys)
    {
        $this->translationKeys = $translationKeys;
    }

    /**
     * @Route(path="/", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->translationKeys->paginate();
        return $this->paginatedResponse($paginated);
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
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->translationKeys->delete($request->get('items'));

        return JsonResponse::create();
    }
}
