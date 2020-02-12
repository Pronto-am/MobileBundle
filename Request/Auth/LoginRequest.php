<?php

namespace Pronto\MobileBundle\Request\Auth;


use Pronto\MobileBundle\Request\BaseRequest;

class LoginRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['email', 'password'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'email'    => ['type' => 'string', 'minLength' => 1],
            'password' => ['type' => 'string', 'minLength' => 1],
        ];
    }
}
