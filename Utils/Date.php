<?php

namespace Pronto\MobileBundle\Utils;


use DateTime;

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
	public static function fromDateAndTime(string $date, string $time, string $format = 'd-m-Y H:i')
	{
		return DateTime::createFromFormat($format, $date . ' ' . $time);
	}
}