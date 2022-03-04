<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\AppVersion;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Contracts\Translation\TranslatorInterface;
use UnexpectedValueException;

class IsSemanticVersionValidator extends ConstraintValidator
{
    private TranslatorInterface $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof IsSemanticVersion) {
            throw new UnexpectedTypeException($constraint, IsSemanticVersion::class);
        }

        // custom constraints should ignore null and empty values to allow
        // other constraints (NotBlank, NotNull, etc.) take care of that
        if (null === $value || '' === $value) {
            return;
        }

        if (!is_string($value)) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, 'string');
        }

        if (!preg_match('/^\d+.\d+.\d+$/', $value, $matches)) {
            $this->context->buildViolation($this->translator->trans($constraint->getTranslationKey()))->addViolation();
        }
    }
}
