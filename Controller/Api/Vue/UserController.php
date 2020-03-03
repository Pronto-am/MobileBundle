<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Repository\UserRepository;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Request\UserRequest;
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
     * @var UserRepository $users
     */
    private $users;

    /**
     * LoginController constructor.
     * @param UserRepository $users
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @Route(path="", methods={"GET"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     */
    public function paginateAction()
    {
        $paginated = $this->users->paginate();
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
        $user = $this->users->findOrFail($id);
        return $this->response($user);
    }

    /**
     * @Route(methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param UserRequest $request
     * @return JsonResponse
     */
    public function saveAction(UserRequest $request)
    {
        $user = $this->users->findOrNew($request->get('id'));

        if($request->get('role') === 'ROLE_USER') {
            $roles = [$request->get('role')];
        } else {
            $roles = ['ROLE_USER', $request->get('role')];
        }

        /** @var User $user */
        $user = $this->serializer->deserialize(User::class, $request->except(['created_at', 'updated_at']), $user);
        $user->setRoles($roles);
        $user->setActivated(false);
        $user->setAppUser(false);
        $this->users->save($user);

        return $this->response($user);
    }

    /**
     * @Route(path="/actions/delete", methods={"POST"})
     * @IsGranted("ROLE_SUPER_ADMIN")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAction(Request $request)
    {
        $this->users->delete($request->get('items'));

        return JsonResponse::create();
    }
}
