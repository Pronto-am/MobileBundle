<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

use InvalidArgumentException;
use Pronto\MobileBundle\Utils\Guzzle\BaseClient;
use RuntimeException;

class Client extends BaseClient
{
    /**
     * @var array $messageGroups Array of message groups
     */
    private $messageGroups;

    /**
     * Constructor
     * @param string $serverKey FCM server key
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
     * Check if the server key is valid
     *
     * @return bool
     */
    private function isServerKeyValid(): bool
    {
        $response = $this->send('', $this::METHOD_POST);

        return $response->getStatusCode() !== 403;
    }

    /**
     * Set the groups the notification should be send to
     *
     * @param array $messageGroups
     */
    public function setMessageGroups(array $messageGroups): void
    {
        $this->messageGroups = $messageGroups;
    }

    /**
     * Send message to the tokens
     *
     * @return Response A response object regarding the send operation.
     * @throws RuntimeException
     * @throws InvalidArgumentException
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
