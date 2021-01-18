<?php

namespace Pronto\MobileBundle\Traits;

trait ApiEntityTrait
{
    /**
     * Get the serializer callbacks
     *
     * @return array
     */
    public static function getSerializerCallbacks(): array
    {
        return [];
    }
}
