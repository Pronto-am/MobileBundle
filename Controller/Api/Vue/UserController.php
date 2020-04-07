<?php

namespace Pronto\MobileBundle\Controller\Api\Vue;


use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Event\UserCreated;
use Pronto\MobileBundle\Repository\UserRepository;
use Pronto\MobileBundle\Request\Request;
use Pronto\MobileBundle\Request\UserRequest;
use Pronto\MobileBundle\Service\EventDispatcher;
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
     * @var EventDispatcher $dispatcher
     */
    private $dispatcher;

    /**
     * LoginController constructor.
     * @param UserRepository $users
     * @param EventDispatcher $dispatcher
     */
    public function __construct(UserRepository $users, EventDispatcher $dispatcher)
    {
        $this->users = $users;
        $this->dispatcher = $dispatcher;
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
        $isNew = $user->getId() === null;

        if($request->get('role') === 'ROLE_USER') {
            $roles = [$request->get('role')];
        } else {
            $roles = ['ROLE_USER', $request->get('role')];
        }

        /** @var User $user */
        $user = $this->serializer->deserialize(User::class, $request->except(['created_at', 'updated_at']), $user);

        if ($request->get('role') !== 'ROLE_SUPER_ADMIN') {
            $user->setCustomer($this->prontoMobile->getCustomer());
        }

        $user->setRoles($roles);
        $user->setActivated(false);
        $user->setAppUser($request->get('role') === 'ROLE_APP_USER');
        $this->users->save($user);

        if($isNew) {
            $event = new UserCreated($user);
            $this->dispatcher->dispatch($event);
        }

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
