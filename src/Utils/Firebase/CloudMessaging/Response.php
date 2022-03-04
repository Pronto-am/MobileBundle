<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

class Response
{
    private int $successCount = 0;
    private int $failureCount = 0;
    private int $modifyCount = 0;
    private array $tokensToModify = [];
    private array $tokensToDelete = [];
    private array $tokensToRetry = [];
    private array $failureReasons = [];

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
