<?php

namespace Pronto\MobileBundle\Request\Auth;


use Pronto\MobileBundle\Request\BaseRequest;
use Pronto\MobileBundle\Request\Format\PasswordConfirmationFormat;

class CreatePasswordRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['token', 'password', 'password_confirmation'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'password'              => ['type' => 'string', 'minLength' => 6],
            'password_confirmation' => ['type' => 'string', 'minLength' => 6, 'format' => 'same'],
        ];
    }

    /**
     * @return array
     */
    public function formats(): array
    {
        return [new PasswordConfirmationFormat($this, 'password', 'password_confirmation')];
    }
}
