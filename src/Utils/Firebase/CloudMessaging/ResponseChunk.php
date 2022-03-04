<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

class ResponseChunk
{
    public const MISSING_REGISTRATION = 'MissingRegistration';
    public const MESSAGE_ID = 'message_id';
    public const REGISTRATION_ID = 'registration_id';
    public const NOT_REGISTERED = 'NotRegistered';
    public const INVALID_REGISTRATION = 'InvalidRegistration';
    public const INVALID_APNS_CREDENTIAL = 'InvalidApnsCredential';
    public const INVALID_PARAMETERS = 'InvalidParameters';
    public const UNAVAILABLE = 'Unavailable';
    public const DEVICE_MESSAGE_RATE_EXCEEDED = 'DeviceMessageRateExceeded';
    public const INTERNAL_SERVER_ERROR = 'InternalServerError';

    private array $response;
    private array $tokens;
    private int $successCount;
    private int $failureCount;
    private int $modifyCount;
    private array $tokensToModify = [];
    private array $tokensToDelete = [];
    private array $tokensToRetry = [];
    private array $failureReasons = [];

    public function __construct(string $response, array $tokens)
    {
        $this->response = json_decode($response, true);
        $this->tokens = $tokens;

        $this->parseResponse();
    }

    private function parseResponse(): void
    {
        $this->successCount = $this->response['success'] ?? 0;
        $this->failureCount = $this->response['failure'] ?? 0;
        $this->modifyCount = $this->response['canonical_ids'] ?? 0;

        if (($this->failureCount > 0 || $this->modifyCount > 0) && isset($this->response['results'])) {
            $this->parseResult();
        }
    }

    private function parseResult(): void
    {
        foreach ($this->response['results'] as $index => $deviceResults) {

            // If it's not send, we need to log the token
            if (!$this->isSent($deviceResults)) {

                // Check if the token has changed, so it can be changed internally
                if (!$this->tokenNeedsModification($index, $deviceResults)) {

                    // Check if the token has to be deleted
                    $this->tokenNeedsDeletion($index, $deviceResults);

                    // Check if we can retry sending the message
                    $this->needToRetry($index, $deviceResults);

                    // Check if the token has no registration
                    $this->tokenLacksRegistration($deviceResults);
                }
            }
        }
    }

    private function isSent($deviceResults): bool
    {
        // If the message id and the registration_id doesn't exist, the notification is sent
        return isset($deviceResults['message_id']) && !isset($deviceResults['registration_id']);
    }

    private function tokenNeedsModification(string $index, array $deviceResults): bool
    {
        // Check if the we need to save the token as a to-be-modified token
        if (isset($deviceResults['message_id'], $deviceResults['registration_id'])) {
            if (isset($this->tokens[$index])) {
                // Save it as old token => new token format
                $this->tokensToModify[$this->tokens[$index]] = $deviceResults['registration_id'];
            }

            return true;
        }

        return false;
    }

    private function tokenNeedsDeletion(string $index, array $deviceResults): void
    {
        // Check if we need to save the token as a to-be-modified token
        if (isset($deviceResults['error']) && (
                in_array(self::INVALID_REGISTRATION, $deviceResults) ||
                in_array(self::INVALID_APNS_CREDENTIAL, $deviceResults) ||
                in_array(self::NOT_REGISTERED, $deviceResults) ||
                in_array(self::INVALID_PARAMETERS, $deviceResults))) {

            if (isset($this->tokens[$index])) {
                // Save it as old token => new token format
                $this->tokensToDelete[] = $this->tokens[$index];

                $this->failureReasons[$this->tokens[$index]] = $deviceResults['error'];
            }
        }
    }

    private function needToRetry(string $index, array $deviceResults): void
    {
        // Check if we need to save the token as a to-be-modified token
        if (isset($deviceResults['error']) && (
                in_array(self::UNAVAILABLE, $deviceResults) ||
                in_array(self::DEVICE_MESSAGE_RATE_EXCEEDED, $deviceResults) ||
                in_array(self::INTERNAL_SERVER_ERROR, $deviceResults))) {

            if (isset($this->tokens[$index])) {
                // Save it as old token => new token format
                $this->tokensToRetry[] = $this->tokens[$index];

                $this->failureReasons[$this->tokens[$index]] = $deviceResults['error'];
            }
        }

    }

    private function tokenLacksRegistration(array $deviceResults): bool
    {
        return isset($deviceResults['error']) && in_array(self::MISSING_REGISTRATION, $deviceResults);
    }

    public function getSuccessCount(): int
    {
        return $this->successCount;
    }

    public function getFailureCount(): int
    {
        return $this->failureCount;
    }

    public function getModifyCount(): int
    {
        return $this->modifyCount;
    }

    public function getTokensToModify(): array
    {
        return $this->tokensToModify;
    }

    public function getTokensToDelete(): array
    {
        return $this->tokensToDelete;
    }

    public function getTokensToRetry(): array
    {
        return $this->tokensToRetry;
    }

    public function getFailureReasons(): array
    {
        return $this->failureReasons;
    }
}
