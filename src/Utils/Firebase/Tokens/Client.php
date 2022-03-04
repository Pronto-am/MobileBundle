<?php

namespace Pronto\MobileBundle\Utils\Firebase\Tokens;

use Exception;
use InvalidArgumentException;
use Pronto\MobileBundle\Utils\Guzzle\BaseClient;
use Psr\Http\Message\ResponseInterface;
use stdClass;

class Client extends BaseClient
{
    public function __construct(string $serverKey)
    {
        // Set the base url
        $this->setBaseUrl('https://iid.googleapis.com/iid/v1:batchImport');

        // Set the authorization header
        $this->setHeaders([
            'Authorization' => 'key=' . $serverKey
        ]);

        if (empty($serverKey)) {
            throw new InvalidArgumentException('Invalid FCM server key.');
        }
    }

    public function parseResponse(ResponseInterface $response)
    {
        try {
            return json_decode($response->getBody()->getContents());
        } catch (Exception $exception) {
            return $response;
        }
    }
}
