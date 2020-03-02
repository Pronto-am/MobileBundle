<?php

namespace Pronto\MobileBundle\Request\Format;


use Carbon\Carbon;
use Exception;

class DateTimeFormat extends ValidationFormat
{
    /**
     * @inheritDoc
     */
    public function validate($data): bool
    {
        try {
            Carbon::parse($data);

            return true;
        } catch (Exception $exception) {
            return false;
        }
    }

    /**
     * @inheritDoc
     */
    public function dataType(): string
    {
        return 'string';
    }

    /**
     * @inheritDoc
     */
    public function name(): string
    {
        return 'date_time';
    }
}
