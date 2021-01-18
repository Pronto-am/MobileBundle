<?php

declare(strict_types=1);

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

    public function getTranslationKey(): string
    {
        return 'form.required_field';
    }
}
