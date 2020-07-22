<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation;


use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\TranslationKey;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
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
     * @var Request $request
     */
    private $request;

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
        $id = (int) $data['id'];
        $id = $id > 0 ? $id : null;

        // Determine whether the identifier is already being used
        $isUnique = $this->entityManager->getRepository(TranslationKey::class)->isUnique($this->prontoMobile->getApplication(), $value, $id);

        if (!$isUnique) {
            $this->context->buildViolation($this->translator->trans($constraint->getTranslationKey()))->addViolation();
        }
    }
}
