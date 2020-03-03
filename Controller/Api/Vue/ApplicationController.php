<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Controller\Api\Vue\ApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Repository\ApplicationRepository;
use Pronto\MobileBundle\Request\ApplicationRequest;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Service\LanguagesLoader;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Class ApplicationController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="applications")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class ApplicationController extends ApiController
{
    /**
     * @var ApplicationRepository $applications
     */
    private $applications;

    /**
     * LoginController constructor.
     * @param ApplicationRepository $applications
     */
    public function __construct(ApplicationRepository $applications)
    {
        $this->applications = $applications;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->applications->paginate();

        return $this->paginatedResponse($paginated);
    }

    /**
     * @Route(path="/{id}", methods={"GET"}, requirements={"id"="\d+"})
     * @IsGranted("ROLE_USER")
     * @param int $id
     * @return JsonResponse
     */
    public function getAction(int $id)
    {
        return $this->response($this->applications->findOrFail($id));
    }

    /**
     * @Route(path="/languages", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param LanguagesLoader $languagesLoader
     * @return JsonResponse
     */
    public function languagesAction(LanguagesLoader $languagesLoader)
    {
        return JsonResponse::create([
            'data' => $languagesLoader->getArray()
        ]);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param ApplicationRequest $request
     * @param LanguagesLoader $languagesLoader
     * @return JsonResponse
     */
    public function saveAction(ApplicationRequest $request, LanguagesLoader $languagesLoader)
    {
        $application = $this->applications->findOrNew($request->get('id'));

        $defaultLanguage = $request->get('default_language');
        $languages = $request->get('languages', []);

        // Get al language objects, besides the default language
        $availableLanguages = array_filter($languagesLoader->getArray(), function($language) use ($defaultLanguage, $languages) {
            return $language->code !== $defaultLanguage && in_array($language->code, $languages);
        });

        // Prepend the default language to the list
        $defaultLanguage = array_filter($languagesLoader->getArray(), function($language) use ($defaultLanguage) {
            return $language->code === $defaultLanguage;
        });

        $availableLanguages = array_merge($defaultLanguage, $availableLanguages);

        /** @var Application $application */
        $application = $this->serializer->deserialize(Application::class, $request->except(['customer', 'created_at', 'updated_at']), $application);
        $application->setAvailableLanguages($availableLanguages);
        $this->applications->save($application);

        return $this->response($application);
    }

    /**
     * @Route(path="/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->applications->delete($request->get('items'));

        return JsonResponse::create();
    }
}
