<?php

namespace Pronto\MobileBundle\Validator\Constraints;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Enum\VariableType;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator as BaseConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

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

    /**
     * IsUniqueIdentifierValidator constructor.
     * @param EntityManagerInterface $entityManager
     * @param ContainerInterface $container
     * @param TranslatorInterface $translator
     * @param RequestStack $requestStack
     */
    public function __construct(EntityManagerInterface $entityManager, ContainerInterface $container, TranslatorInterface $translator, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->prontoMobile = $container->get('Pronto\MobileBundle\Service\ProntoMobile');
        $this->translator = $translator;
        $this->request = $requestStack->getCurrentRequest();
    }

    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
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

    /**
     * @return string
     */
    public abstract function requiresInstanceOf(): string;

    /**
     * @return VariableType|null
     */
    public abstract function valueIsOfType(): ?VariableType;

    /**
     * @param $value
     * @return bool
     */
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

    /**
     * @param $value
     * @param Constraint $constraint
     */
    public abstract function handle($value, Constraint $constraint): void;

    /**
     * @return string
     */
    protected function getErrorMessage(): string
    {
        $translationKey = 'form.invalid_value';

        if ($this->constraint instanceof TranslatableConstraint) {
            $translationKey = $this->constraint->getTranslationKey();
        }

        return $this->translator->trans($translationKey);
    }
}
