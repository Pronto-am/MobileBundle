<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class AppVersionRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return [
            'version',
            'platform',
            'release_date',
            'description',
        ];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'version'      => ['type' => 'string', 'format' => 'semantic'],
            'release_date' => ['type' => 'string', 'format' => 'date_time'],
            'description'  => [
                'type' => 'object',
                'patternProperties' => [
                    '[a-zA-Z]+' => ['type' => 'string', 'format' => 'editor_required']
                ],
            ],
            'required'     => ['type' => 'boolean'],
        ];
    }

    /**
     * @return array
     */
    public function formats(): array
    {
        return [new SemanticVersionFormat(), new EditorRequiredFormat(), new DateTimeFormat()];
    }
}
