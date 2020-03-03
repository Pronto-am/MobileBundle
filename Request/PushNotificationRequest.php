<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class PushNotificationRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return [];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
