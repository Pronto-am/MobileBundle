<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class ApplicationRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['name', 'label', 'default_language'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
