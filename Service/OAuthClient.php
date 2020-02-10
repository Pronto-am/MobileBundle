<?php


namespace Pronto\MobileBundle\Service;


use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class OAuthClient
{
    /**
     * @var Client $client
     */
    private $client;

    public function __construct(RequestStack $requestStack)
    {
        $baseUri = $requestStack->getCurrentRequest()->getSchemeAndHttpHost();

        $this->client = new Client([
            'base_uri'    => $baseUri,
            'verify'      => false,
            'http_errors' => false
        ]);
    }

    /**
     * @param string $email
     * @param string $password
     * @return ResponseInterface
     */
    public function login(string $email, string $password)
    {
        return $this->client->post('oauth/v2/token', [
            'json' => [
                'grant_type'    => 'password',
                'username'      => $email,
                'password'      => $password,
                'client_id'     => '',
                'client_secret' => '',
            ]
        ]);
    }
}
