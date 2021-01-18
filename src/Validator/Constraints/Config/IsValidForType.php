<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\Config;

use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsValidForType extends TranslatableConstraint
{
    public function getTranslationKey(): string
    {
        return 'remote_config.value.invalid';
    }
}
