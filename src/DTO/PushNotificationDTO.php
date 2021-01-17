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
	/**
	 * @var bool $schedule
	 */
	public $schedule;

	/**
	 * @var DateTime $scheduledSending
	 */
	public $scheduledSending;

	/**
	 * @var int $segment
	 */
	public $segment;

	/**
	 * @var bool $test
	 */
	public $test;

	/**
	 * @return array
	 */
	public static function getFillable(): array
	{
		return ['schedule', 'scheduledSending', 'segment', 'test'];
	}
}
