<?php

namespace Pronto\MobileBundle\Validator\Constraints\Config;


use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsValidForType extends TranslatableConstraint
{
    /**
     * @return string
     */
    public function getTranslationKey(): string
    {
        return 'remote_config.value.invalid';
    }
}
