<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Enum\VariableType;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator as BaseConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;
use Symfony\Contracts\Translation\TranslatorInterface;

abstract class ConstraintValidator extends BaseConstraintValidator
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    protected $entityManager;

    /**
     * @var ProntoMobile $prontoMobile
     */
    protected $prontoMobile;

    /**
     * @var TranslatorInterface $translator
     */
    protected $translator;

    /**
     * @var Request $request
     */
    protected $request;

    /**
     * @var Constraint $constraint
     */
    protected $constraint;

    /**
     * @var bool $skipNullValues
     */
    protected $skipNullValues = true;

    public function __construct(
        EntityManagerInterface $entityManager,
        ContainerInterface $container,
        TranslatorInterface $translator,
        RequestStack $requestStack
    ) {
        $this->entityManager = $entityManager;
        $this->prontoMobile = $container->get(ProntoMobile::class);
        $this->translator = $translator;
        $this->request = $requestStack->getCurrentRequest();
    }

    public function validate($value, Constraint $constraint)
    {
        $this->constraint = $constraint;

        $instanceOf = $this->requiresInstanceOf();
        if (!$constraint instanceof $instanceOf) {
            throw new UnexpectedTypeException($constraint, $instanceOf);
        }

        // Custom constraints should ignore null and empty values to allow other constraints (NotBlank, NotNull, etc.) take care of that
        if ($this->skipNullValues && ($value === null || empty($value))) {
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
