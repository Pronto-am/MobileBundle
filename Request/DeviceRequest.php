<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class DeviceRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['test_device'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'test_device' => ['type' => 'boolean']
        ];
    }
}
