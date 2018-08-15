<?php

namespace Pronto\MobileBundle\Utils;


use DateTime;
use DateTimeZone;

class Date
{
	/**
	 * Create a datetime object from date and time strings
	 *
	 * @param $date
	 * @param $time
	 * @param string $format
	 * @return bool|DateTime
	 */
	public static function fromDateAndTime($date, $time, $format = 'd-m-Y H:i')
	{
		return DateTime::createFromFormat($format, $date . ' ' . $time);
	}
}