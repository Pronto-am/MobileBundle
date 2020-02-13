<?php

namespace Pronto\MobileBundle\Request;

class CustomerRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return [
            'company_name',
            'contact_person',
            'phone_number',
            'email',
            'primary_color',
            'primary_color_dark',
            'link_color',
            'link_color_dark',
            'contrast_color',
        ];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
