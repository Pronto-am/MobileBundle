<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation\Upload;


use Pronto\MobileBundle\Validator\Constraints\TranslatableConstraint;

/**
 * @Annotation
 */
class BlankForFileType extends TranslatableConstraint
{
    /**
     * @var string $extension
     */
    public $extension;

    /**
     * @return string
     */
    public function getTranslationKey(): string
    {
        return 'form.required_field';
    }
}
