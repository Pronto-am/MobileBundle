<?php

namespace Pronto\MobileBundle\Validator\Constraints\Translation\Upload;


use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use UnexpectedValueException;

class BlankForFileTypeValidator extends ConstraintValidator
{
    /**
     * @var TranslatorInterface $translator
     */
    private $translator;

    /**
     * @var Request $request
     */
    private $request;

    /**
     * @param TranslatorInterface $translator
     * @param RequestStack $requestStack
     */
    public function __construct(TranslatorInterface $translator, RequestStack $requestStack)
    {
        $this->translator = $translator;
        $this->request = $requestStack->getCurrentRequest();
    }

    /**
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof BlankForFileType) {
            throw new UnexpectedTypeException($constraint, BlankForFileType::class);
        }

        if (!is_string($value)) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, 'string');
        }

        $files = $this->request->files->get('upload_form');

        /** @var UploadedFile $file */
        $file = $files['file'];

        if (null === $file) {
            return;
        }

        // The fields need to be filled when the extension of the file matches the constraint extension
        if (strtolower($file->getClientOriginalExtension()) !== strtolower($constraint->extension) && (null === $value || '' === $value)) {
            $this->context->buildViolation($this->translator->trans($constraint->getTranslationKey()))->addViolation();
        }
    }
}
