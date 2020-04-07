<?php

namespace Pronto\MobileBundle\Request\TranslationKey;

use Pronto\MobileBundle\Request\BaseRequest;

class TranslationRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['translation_key_id', 'language', 'text'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'translation_key_id' => ['type' => 'integer', 'minLength' => 1],
        ];
    }
}
