<?php


namespace Pronto\MobileBundle\Service;


use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class OAuthClient
{
    /**
     * @var Client $guzzleClient
     */
    private $guzzleClient;

    /**
     * @var \Pronto\MobileBundle\Entity\OAuthClient $oauthClient
     */
    private $oauthClient;

    /**
     * OAuthClient constructor.
     * @param RequestStack $requestStack
     * @param EntityManagerInterface $entityManager
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager)
    {
        $this->oauthClient = $entityManager->getRepository(\Pronto\MobileBundle\Entity\OAuthClient::class)->getInternalClient();

        $baseUri = $requestStack->getCurrentRequest()->getSchemeAndHttpHost();

        $this->guzzleClient = new Client([
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
        return $this->guzzleClient->post('oauth/v2/token', [
            'json' => [
                'grant_type'    => 'password',
                'username'      => $email,
                'password'      => $password,
                'client_id'     => $this->oauthClient->getPublicId(),
                'client_secret' => $this->oauthClient->getSecret(),
            ]
        ]);
    }

    /**
     * @param string $refreshToken
     * @return ResponseInterface
     */
    public function refresh(string $refreshToken)
    {
        return $this->guzzleClient->post('oauth/v2/token', [
            'json' => [
                'grant_type'    => 'refresh_token',
                'refresh_token' => $refreshToken,
                'client_id'     => $this->oauthClient->getPublicId(),
                'client_secret' => $this->oauthClient->getSecret(),
            ]
        ]);
    }
}
