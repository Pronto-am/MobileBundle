<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

interface ApiEntityInterface
{
    /**
     * Get the callbacks for properties after serialization
     *
     * @return array
     */
    public static function getSerializerCallbacks(): array;
}
