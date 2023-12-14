<?php

namespace Pronto\MobileBundle\Service\PushNotification;

use Exception;
use Google\Auth\Credentials\ServiceAccountCredentials;
use Google\Auth\Middleware\AuthTokenMiddleware;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\HandlerStack;
use Psr\Http\Message\ResponseInterface;

class ApnsTokenConverter
{
    private int $numberOfTokens = 0;
    private array $chunks = [];
    private string $bundle;
    private array $serviceAccount;

    public function setBundle(string $bundle): void
    {
        $this->bundle = $bundle;
    }

    public function setDevices(array $devices): void
    {
        $this->convertDevicesToTokens($devices);
    }

    public function setServiceAccount(array $serviceAccount): void
    {
        $this->serviceAccount = $serviceAccount;
    }

    private function convertDevicesToTokens(array $devices): void
    {
        // Convert to a single array of tokens
        $tokens = array_map(function ($device) {
            return $device[] = $device['apnsToken'];
        }, $devices);

        $this->numberOfTokens = count($tokens);

        // Firebase has a limit of 100 tokens per conversion
        $this->chunks = array_chunk($tokens, 100);
    }

    /**
     * @throws GuzzleException
     */
    public function convert(): array|false
    {
        if (!$this->canConvert()) {
            return false;
        }

        $results = [];

        // Loop through the chunks of tokens
        foreach ($this->chunks as $chunk) {
            try {
                $response = $this->execute($chunk);
            } catch (Exception) {
                continue;
            }

            // Return the results
            $results = array_merge($results, $response['results'] ?? []);
        }

        return $results;
    }

    private function canConvert(): bool
    {
        return $this->numberOfTokens !== 0 && !empty($this->serviceAccount) && !empty($this->bundle);
    }

    /**
     * @throws GuzzleException
     */
    private function execute(array $chunk): array
    {
        $credentials = new ServiceAccountCredentials(
            scope: ['https://www.googleapis.com/auth/firebase.messaging'],
            jsonKey: $this->serviceAccount,
        );

        $middleware = new AuthTokenMiddleware($credentials);
        $stack = HandlerStack::create();
        $stack->push($middleware);

        $client = new Client([
            'handler'  => $stack,
            'base_uri' => 'https://iid.googleapis.com',
            'auth'     => 'google_auth',
        ]);

        $response = $client->post(
            uri: '/iid/v1:batchImport',
            options: [
                'headers' => [
                    'access_token_auth' => 'true'
                ],
                'json'    => [
                    'application' => $this->bundle,
                    'sandbox'     => false,
                    'apns_tokens' => $chunk
                ],
            ]
        );

        return json_decode($response->getBody()->getContents(), true);
    }
}
