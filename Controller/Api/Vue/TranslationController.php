<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Repository\TranslationKey\TranslationRepository;
use Pronto\MobileBundle\Repository\TranslationKeyRepository;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Request\TranslationKey\TranslationRequest;
use Pronto\MobileBundle\Utils\Responses\ErrorResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class TranslationController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="translations")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class TranslationController extends ApiController
{
    /**
     * @var TranslationKeyRepository $translationKeys
     */
    private $translationKeys;

    /**
     * @var TranslationRepository $translations
     */
    private $translations;

    /**
     * LoginController constructor.
     * @param TranslationKeyRepository $translationKeys
     * @param TranslationRepository $translations
     */
    public function __construct(TranslationKeyRepository $translationKeys, TranslationRepository $translations)
    {
        $this->translationKeys = $translationKeys;
        $this->translations = $translations;
    }

    /**
     * @Route(methods={"GET"})
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
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @return JsonResponse
     */
    public function saveAction()
    {
        return JsonResponse::create(['data' => []]);
    }

    /**
     * @Route(path="/inline", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param TranslationRequest $request
     * @return JsonResponse
     */
    public function saveTranslationAction(TranslationRequest $request)
    {
        $translationKey = $this->translationKeys->findOrFail($request->get('translation_key_id'));

        /** @var Translation $translation */
        $translation = $this->translations->findOrNew([
            'translationKey' => $translationKey,
            'language'       => $request->get('language')
        ]);

        $translation->setText($request->get('text'));

        $this->translations->save($translation);

        return $this->response($translation);
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
