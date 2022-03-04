<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

use GuzzleHttp\Exception\GuzzleException;
use InvalidArgumentException;
use Pronto\MobileBundle\Utils\Guzzle\BaseClient;
use RuntimeException;

class Client extends BaseClient
{
    private array $messageGroups;

    /**
     * @throws InvalidArgumentException
     */
    public function __construct(string $serverKey)
    {
        // Set the base url
        $this->setBaseUrl('https://fcm.googleapis.com/fcm/send');

        // Set the authorization header
        $this->setHeaders([
            'Authorization' => 'key=' . $serverKey
        ]);

        if (!$this->isServerKeyValid()) {
            throw new InvalidArgumentException('Invalid FCM server key.');
        }
    }

    /**
     * @throws GuzzleException
     */
    private function isServerKeyValid(): bool
    {
        $response = $this->send('', $this::METHOD_POST);

        return $response->getStatusCode() !== 403;
    }

    public function setMessageGroups(array $messageGroups): void
    {
        $this->messageGroups = $messageGroups;
    }

    /**
     * @throws RuntimeException
     * @throws InvalidArgumentException
     * @throws GuzzleException
     */
    public function sendNotification(): Response
    {
        $response = new Response();

        foreach ($this->messageGroups as $messageGroup) {

            $chunks = array_chunk($messageGroup->getTokens(), 1000);

            foreach ($chunks as $chunk) {
                $body = $messageGroup->getMessage()->getFields();
                $body['registration_ids'] = $chunk;

                $this->setBody($body);

                // Send the notification
                $parsed = $this->send('', $this::METHOD_POST);

                $responseChunk = new ResponseChunk($parsed->getBody()->getContents(), $chunk);

                // Add the chunk to the overall Response object
                $response->addChunk($responseChunk);
            }
        }

        return $response;
    }
}
