<?php

namespace Pronto\MobileBundle\Tests\Utils;

use Pronto\MobileBundle\Utils\Date;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class DateTest extends TestCase
{
	/**
	 * Test creating a new datetime object
	 */
	public function testCreateFromDateAndTime(): void
	{
		$date = '07-08-2018';
		$time = '08:12';

		$dateTime = Date::fromDateAndTime($date, $time);

		$this->assertEquals('2018-08-07 08:12:00', $dateTime->format('Y-m-d H:i:s'));

		$date = '2018-08-07';
		$time = '08:14';

		$dateTime = Date::fromDateAndTime($date, $time);

		$this->assertEquals(false, $dateTime);
	}
}