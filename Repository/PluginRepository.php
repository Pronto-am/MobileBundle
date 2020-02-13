<?php

namespace Pronto\MobileBundle\Repository;

use Pronto\MobileBundle\Entity\Plugin;

class PluginRepository extends EntityRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Plugin::class;
    }
}
