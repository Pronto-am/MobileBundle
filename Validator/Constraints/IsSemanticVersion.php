<?php

namespace Pronto\MobileBundle\Validator\Constraints;


use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class IsSemanticVersion extends Constraint
{
    public $message = 'The specified version "{{ string }}" isn\'t semantic.';
}