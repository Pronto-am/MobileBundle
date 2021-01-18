<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation;

use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsUniqueIdentifier extends TranslatableConstraint
{
    /**
     * @return string
     */
    public function getTranslationKey(): string
    {
        return 'translation.identifier.unique';
    }
}
