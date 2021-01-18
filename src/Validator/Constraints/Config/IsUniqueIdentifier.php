<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\Config;

use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsUniqueIdentifier extends TranslatableConstraint
{
    public function getTranslationKey(): string
    {
        return 'remote_config.identifier.unique';
    }
}
