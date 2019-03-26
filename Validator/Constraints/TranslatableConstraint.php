<?php

namespace Pronto\MobileBundle\Validator\Constraints;


use Symfony\Component\Validator\Constraint;

abstract class TranslatableConstraint extends Constraint
{
    /**
     * @return string
     */
    public abstract function getTranslationKey(): string;
}