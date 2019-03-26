<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use UnexpectedValueException;

class IsUniqueIdentifierValidator extends ConstraintValidator
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    private $entityManager;

    /**
     * @var ProntoMobile $prontoMobile
     */
    private $prontoMobile;

    /**
     * @var TranslatorInterface $translator
     */
    private $translator;

    /**
     * IsUniqueIdentifierValidator constructor.
     * @param EntityManagerInterface $entityManager
     * @param ProntoMobile $prontoMobile
     * @param TranslatorInterface $translator
     */
    public function __construct(EntityManagerInterface $entityManager, ProntoMobile $prontoMobile, TranslatorInterface $translator)
    {
        $this->entityManager = $entityManager;
        $this->prontoMobile = $prontoMobile;
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
        if (!$constraint instanceof IsUniqueIdentifier) {
            throw new UnexpectedTypeException($constraint, IsUniqueIdentifier::class);
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

        // Determine whether the identifier is already being used
        $translationKey = $this->entityManager->getRepository(TranslationKey::class)->findOneBy([
            'application' => $this->prontoMobile->getApplication(),
            'identifier'  => $value
        ]);

        if ($translationKey !== null) {
            $this->context->buildViolation($this->translator->trans($constraint->getTranslationKey()))->addViolation();
        }
    }
}