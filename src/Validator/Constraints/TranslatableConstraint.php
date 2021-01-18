<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

abstract class TranslatableConstraint extends Constraint
{
    public abstract function getTranslationKey(): string;
}
