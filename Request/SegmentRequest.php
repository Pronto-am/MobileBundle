<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class SegmentRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['name'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => [
                'type'              => 'object',
                'patternProperties' => [
                    '[a-zA-Z]+' => ['type' => 'string', 'minLength' => 1]
                ],
            ]
        ];
    }
}
