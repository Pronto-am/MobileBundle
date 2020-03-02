<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\AppVersion;
use Pronto\MobileBundle\Repository\AppVersionRepository;
use Pronto\MobileBundle\Request\AppVersionRequest;
use Pronto\MobileBundle\Request\AppVersion\FileRequest;
use Pronto\MobileBundle\Request\BaseRequest;
use Pronto\MobileBundle\Request\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

/**
 * Class AppVersionController
 * @package Pronto\MobileBundle\Controller\Api\Vue
 * @Route(path="versions")
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class AppVersionController extends ApiController
{
    /**
     * @var AppVersionRepository $appVersions
     */
    private $appVersions;

    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * AppVersionController constructor.
     * @param AppVersionRepository $appVersions
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(AppVersionRepository $appVersions, EntityManagerInterface $entityManager)
    {
        $this->appVersions = $appVersions;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->appVersions->paginate();
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
        return $this->response($this->appVersions->findOrFail($id), [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param AppVersionRequest $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function saveAction(AppVersionRequest $request)
    {
        $version = $this->appVersions->findOrNew($request->get('id'));
        /** @var AppVersion $version */
        $version = $this->serializer->deserialize(AppVersion::class, $request->except(['description', 'release_date', 'created_at', 'updated_at']), $version);
        $version->setReleaseDate(new Carbon($request->get('release_date')));
        $version->setDescription($request->get('description'));
        $this->appVersions->save($version);

        return $this->response($version, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/file", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param FileRequest $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function uploadAction(FileRequest $request)
    {
        /** @var AppVersion $version */
        $version = $this->appVersions->findOrFail($request->get('version_id'));

        // Upload the file by saving it as UploadedFile
        $version->setFileName($request->file('file'));
        $this->appVersions->save($version);

        return $this->response($version, [
            new DateTimeNormalizer()
        ]);
    }

    /**
     * @Route(path="/actions/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->appVersions->delete($request->get('items'));

        return JsonResponse::create();
    }
}
