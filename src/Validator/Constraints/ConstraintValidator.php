<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Enum\VariableType;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator as BaseConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;
use Symfony\Contracts\Translation\TranslatorInterface;

abstract class ConstraintValidator extends BaseConstraintValidator
{
    protected ?Request $request;
    protected Constraint $constraint;
    protected bool $skipNullValues = true;

    public function __construct(
        protected readonly EntityManagerInterface $entityManager,
        protected readonly ProntoMobile $prontoMobile,
        protected readonly TranslatorInterface $translator,
        RequestStack $requestStack
    ) {
        $this->request = $requestStack->getCurrentRequest();
    }

    public function validate($value, Constraint $constraint): void
    {
        $this->constraint = $constraint;

        $instanceOf = $this->requiresInstanceOf();
        if (!$constraint instanceof $instanceOf) {
            throw new UnexpectedTypeException($constraint, $instanceOf);
        }

        // Custom constraints should ignore null and empty values to allow other constraints (NotBlank, NotNull, etc.) take care of that
        if ($this->skipNullValues && empty($value)) {
            return;
        }

        if ($this->valueIsOfType() !== null && !$this->valueTypeIsValid($value)) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, $this->valueIsOfType()->getValue());
        }

        $this->handle($value, $constraint);
    }

    public abstract function requiresInstanceOf(): string;

    public abstract function valueIsOfType(): ?VariableType;

    private function valueTypeIsValid($value): bool
    {
        switch ($this->valueIsOfType()->getValue()) {
            case VariableType::STRING()->getValue():
                return is_string($value);
            case VariableType::BOOL()->getValue():
                return is_bool($value);
            case VariableType::INTEGER()->getValue():
                return is_integer($value);
            case VariableType::ARRAY()->getValue():
                return is_array($value);
        }
    }

    public abstract function handle($value, Constraint $constraint): void;

    protected function getErrorMessage(): string
    {
        $translationKey = 'form.invalid_value';

        if ($this->constraint instanceof TranslatableConstraint) {
            $translationKey = $this->constraint->getTranslationKey();
        }

        return $this->translator->trans($translationKey);
    }
}
