<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

use Kreait\Firebase\Messaging\MulticastSendReport;

class Response
{
    private int $successCount = 0;
    private int $failureCount = 0;
    private array $tokensToDelete = [];

    public function addReport(MulticastSendReport $report): void
    {
        $this->successCount += $report->successes()->count();
        $this->failureCount += $report->failures()->count();

        $this->tokensToDelete = array_merge(
            $this->tokensToDelete,
            $report->invalidTokens(),
            $report->unknownTokens(),
        );
    }

    public function getSuccessCount(): int
    {
        return $this->successCount;
    }

    public function getFailureCount(): int
    {
        return $this->failureCount;
    }

    public function getTokensToDelete(): array
    {
        return $this->tokensToDelete;
    }
}
