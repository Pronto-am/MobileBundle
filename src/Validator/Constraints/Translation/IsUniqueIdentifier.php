<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\Translation;

use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsUniqueIdentifier extends TranslatableConstraint
{
    public function getTranslationKey(): string
    {
        return 'translation.identifier.unique';
    }
}
