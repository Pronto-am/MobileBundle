<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\Auth;


use Pronto\MobileBundle\Request\Auth\LoginRequest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class LoginController
 * @package Pronto\MobileBundle\Controller\Api\Vue\Auth
 * @Route(path="auth/")
 */
class LoginController extends Controller
{
    /**
     * @param LoginRequest $request
     * @Route(path="login")
     */
    public function loginAction(LoginRequest $request)
    {
        //
    }
}
