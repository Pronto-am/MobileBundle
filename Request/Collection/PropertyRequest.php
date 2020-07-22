<?php

namespace Pronto\MobileBundle\Request\Collection;

use Pronto\MobileBundle\Request\BaseRequest;

class PropertyRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        $default = [
            'name',
            'identifier',
            'type',
            'include_in_list_view',
            'include_in_json_list_view',
            'translatable',
            'required',
        ];

        // Add rules based on the type

        return $default;
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
