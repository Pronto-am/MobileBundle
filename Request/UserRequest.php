<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class UserRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['first_name', 'last_name', 'email', 'role'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'email'     => ['type' => 'string', 'format' => 'email'],
            'insertion' => ['type' => ['null', 'string']],
        ];
    }
}
