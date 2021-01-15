<?php

namespace Pronto\MobileBundle\Validator\Constraints\AppVersion;


use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsSemanticVersion extends TranslatableConstraint
{
    /**
     * @return string
     */
    public function getTranslationKey(): string
    {
        return 'app_version.version.is_semantic';
    }
}
