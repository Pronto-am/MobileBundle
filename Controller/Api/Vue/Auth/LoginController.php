<?php

namespace Pronto\MobileBundle\Controller\Api\Vue\Auth;


use Pronto\MobileBundle\Request\Auth\RefreshTokenRequest;
use Pronto\MobileBundle\Request\Auth\ResetPasswordRequest;
use Pronto\MobileBundle\Service\OAuthClient;
use Pronto\MobileBundle\Request\Auth\LoginRequest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class LoginController
 * @package Pronto\MobileBundle\Controller\Api\Vue\Auth
 * @Route(path="auth/")
 */
class LoginController extends AbstractController
{
    /**
     * @var OAuthClient $client
     */
    private $client;

    /**
     * LoginController constructor.
     * @param OAuthClient $client
     */
    public function __construct(OAuthClient $client)
    {
        $this->client = $client;
    }

    /**
     * @param LoginRequest $request
     * @return string
     * @Route(path="login")
     */
    public function loginAction(LoginRequest $request)
    {
        $response = $this->client->login($request->get('email'), $request->get('password'));

        return new JsonResponse(json_decode($response->getBody()->getContents()), $response->getStatusCode());
    }

    /**
     * @param ResetPasswordRequest $request
     * @return string
     * @Route(path="password")
     */
    public function resetPasswordAction(ResetPasswordRequest $request)
    {
        $response = $this->client->login($request->get('email'), $request->get('password'));

        return new JsonResponse(json_decode($response->getBody()->getContents()), $response->getStatusCode());
    }

    /**
     * @param RefreshTokenRequest $request
     * @return string
     * @Route(path="token")
     */
    public function refreshTokenAction(RefreshTokenRequest $request)
    {
        $response = $this->client->login($request->get('email'), $request->get('password'));

        return new JsonResponse(json_decode($response->getBody()->getContents()), $response->getStatusCode());
    }
}
