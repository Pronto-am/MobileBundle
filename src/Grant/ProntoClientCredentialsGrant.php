<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Grant;

use DateInterval;
use League\OAuth2\Server\Grant\ClientCredentialsGrant;
use Psr\Http\Message\ServerRequestInterface;
use League\Bundle\OAuth2ServerBundle\AuthorizationServer\GrantTypeInterface;

final class ProntoClientCredentialsGrant extends ClientCredentialsGrant implements GrantTypeInterface
{
    protected function getClientCredentials(ServerRequestInterface $request)
    {
        $clientSecret = $this->getRequestParameter('client_secret',  $request);
        if (isset($request->getAttributes()['client_id_pronto_legacy']) && !is_null($clientSecret)) {
            return [$request->getAttributes()['client_id_pronto_legacy'], $clientSecret];
        }

        return parent::getClientCredentials($request);
    }

    public function getAccessTokenTTL(): ?\DateInterval
    {
        return new DateInterval('PT5H');
    }
}