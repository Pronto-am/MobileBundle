<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation;


use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class IsUniqueIdentifier extends TranslatableConstraint
{
    /**
     * @var string $translationKey
     */
    private $translationKey = 'translation.identifier.unique';

    /**
     * @return string
     */
    public function getTranslationKey(): string
    {
        return $this->translationKey;
    }
}