<?php

namespace Pronto\MobileBundle\Request\Auth;


use Pronto\MobileBundle\Request\BaseRequest;

class RefreshTokenRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['refresh_token'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
