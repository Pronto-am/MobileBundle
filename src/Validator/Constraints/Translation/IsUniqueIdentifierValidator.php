<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Contracts\Translation\TranslatorInterface;
use UnexpectedValueException;

class IsUniqueIdentifierValidator extends ConstraintValidator
{
    private ?Request $request;

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly ProntoMobile $prontoMobile,
        private readonly TranslatorInterface $translator,
        RequestStack $requestStack
    ) {
        $this->request = $requestStack->getCurrentRequest();
    }

    public function validate($value, Constraint $constraint): void
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

        $data = $this->request->request->get('translation_form');
        $id = (int)$data['id'];
        $id = $id > 0 ? $id : null;

        // Determine whether the identifier is already being used
        $isUnique = $this->entityManager->getRepository(TranslationKey::class)->isUnique($this->prontoMobile->getApplication(), $value, $id);

        if (!$isUnique) {
            $this->context->buildViolation($this->translator->trans($constraint->getTranslationKey()))->addViolation();
        }
    }
}
