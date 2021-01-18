<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\EventSubscriber;

interface ValidatePluginStateInterface
{
    /**
     * Check if the plugin is active
     *
     * @return string
     */
    public function getPluginIdentifier(): string;
}
