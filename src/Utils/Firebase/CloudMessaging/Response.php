<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

class Response
{
    /**
     * Number of successfully send notifications
     * @var integer
     */
    private $successCount = 0;

    /**
     * Number of failures
     * @var integer
     */
    private $failureCount = 0;

    /**
     * Number of tokens to modify
     * @var integer
     */
    private $modifyCount = 0;

    /**
     * The tokens that need modification
     *
     * @var array
     */
    private $tokensToModify = [];

    /**
     * The tokens that need to be deleted
     *
     * @var array
     */
    private $tokensToDelete = [];

    /**
     * The tokens for which we need to retry sending the message
     *
     * @var array
     */
    private $tokensToRetry = [];

    /**
     * The reasons why a message was not sent to tokens
     *
     * @var array
     */
    private $failureReasons = [];

    /**
     * Add the data of the chunk to the Response object
     *
     * @param ResponseChunk $chunk
     */
    public function addChunk(ResponseChunk $chunk): void
    {
        $this->successCount += $chunk->getSuccessCount();
        $this->failureCount += $chunk->getFailureCount();
        $this->modifyCount += $chunk->getModifyCount();

        $this->tokensToModify = array_merge($this->tokensToModify, $chunk->getTokensToModify());
        $this->tokensToDelete = array_merge($this->tokensToDelete, $chunk->getTokensToDelete());
        $this->tokensToRetry = array_merge($this->tokensToRetry, $chunk->getTokensToRetry());
        $this->failureReasons = array_merge($this->failureReasons, $chunk->getFailureReasons());
    }

    /**
     * @return int
     */
    public function getSuccessCount(): int
    {
        return $this->successCount;
    }

    /**
     * @return int
     */
    public function getFailureCount(): int
    {
        return $this->failureCount;
    }

    /**
     * @return int
     */
    public function getModifyCount(): int
    {
        return $this->modifyCount;
    }

    /**
     * @return array
     */
    public function getTokensToModify(): array
    {
        return $this->tokensToModify;
    }

    /**
     * @return array
     */
    public function getTokensToDelete(): array
    {
        return $this->tokensToDelete;
    }

    /**
     * @return array
     */
    public function getTokensToRetry(): array
    {
        return $this->tokensToRetry;
    }

    /**
     * Get the failure reasons of notifications
     *
     * @return array
     */
    public function getFailureReasons(): array
    {
        return $this->failureReasons;
    }
}
