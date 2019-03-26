<?php

namespace Pronto\MobileBundle\Validator\Constraints\AppVersion;


use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsSemanticVersion extends TranslatableConstraint
{
    /**
     * @var string $translationKey
     */
    private $translationKey = 'app_version.version.is_semantic';

    /**
     * @return string
     */
    public function getTranslationKey(): string
    {
        return $this->translationKey;
    }
}