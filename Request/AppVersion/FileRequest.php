<?php

namespace Pronto\MobileBundle\Request\AppVersion;

use Pronto\MobileBundle\Request\BaseRequest;

class FileRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function required(): array
    {
        return ['version_id'];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
