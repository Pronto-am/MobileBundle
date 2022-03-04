<?php

namespace Pronto\MobileBundle\Utils;

use DateTime;

class Date
{
    public static function fromDateAndTime(string $date, string $time, string $format = 'd-m-Y H:i')
    {
        return DateTime::createFromFormat($format, $date . ' ' . $time);
    }
}
