<?php

namespace Pronto\MobileBundle\Request;

use Pronto\MobileBundle\Request\Format\DateTimeFormat;
use Pronto\MobileBundle\Request\Format\EditorRequiredFormat;
use Pronto\MobileBundle\Request\Format\SemanticVersionFormat;

class PushNotificationRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['title', 'segment_id'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'title' => [
                'type'              => 'object',
                'patternProperties' => [
                    '[a-zA-Z]+' => ['type' => 'string', 'format' => 'editor_required']
                ],
            ],
            'segment_id' => ['type' => ['number', 'null']],
        ];
    }

    /**
     * @return array
     */
    public function formats(): array
    {
        return [new EditorRequiredFormat()];
    }
}
