<?php

namespace Pronto\MobileBundle\Request\Auth;


use Pronto\MobileBundle\Request\BaseRequest;

class ResetPasswordRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['email'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
