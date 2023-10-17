<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use DateTime;

/**
 * Class PushNotificationDTO
 * @package Pronto\MobileBundle\DTO
 */
class PushNotificationDTO extends BaseDTO
{
    public bool $schedule;

    public DateTime $scheduledSending;

    public int|null $segment;

    public bool $test;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return ['scheduledSending', 'segment', 'test'];
    }
}
