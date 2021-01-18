<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\AppVersion;

use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use UnexpectedValueException;

class IsSemanticVersionValidator extends ConstraintValidator
{
    /**
     * @var TranslatorInterface $translator
     */
    private $translator;

    /**
     * IsSemanticVersionValidator constructor.
     * @param TranslatorInterface $translator
     */
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
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
