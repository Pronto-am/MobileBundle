<?php

namespace Pronto\MobileBundle\Request;

class PluginRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['active', 'plugin'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'plugin' => [
                'type' => 'object',
                'required' => ['id', 'name', 'identifier'],
            ],
            'active' => ['type' => 'boolean']
        ];
    }
}
