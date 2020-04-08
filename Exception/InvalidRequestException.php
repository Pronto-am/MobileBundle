<?php

namespace Pronto\MobileBundle\Exception;

use Exception;
use Opis\JsonSchema\FormatContainer;
use Opis\JsonSchema\ValidationError;
use Pronto\MobileBundle\Request\Format\ValidationFormat;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\Translation\TranslatorInterface;
use Throwable;

class InvalidRequestException extends Exception
{
    /**
     * @var TranslatorInterface $translator
     */
    private $translator;

    /**
     * @var ValidationError[] $errors
     */
    private $errors;

    /**
     * @var FormatContainer $formatContainer
     */
    private $formatContainer;

    /**
     * InvalidRequestException constructor.
     * @param TranslatorInterface $translator
     * @param ValidationError[] $errors
     * @param FormatContainer $formatContainer
     * @param Throwable|null $previous
     */
    public function __construct(TranslatorInterface $translator, array $errors, FormatContainer $formatContainer, Throwable $previous = null)
    {
        $this->translator = $translator;
        $this->errors = $errors;
        $this->formatContainer = $formatContainer;

        parent::__construct('Invalid Request', 422, $previous);
    }

    /**
     * @return array
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * @return JsonResponse
     */
    public function getJsonResponse()
    {
        $responseData = [
            'message' => 'The provided data is invalid',
            'errors'  => array_reduce($this->getErrors(), function ($result, ValidationError $error) {
                // Data is present, but invalid
                if (count($error->dataPointer()) > 0) {
                    [$key] = $error->dataPointer();
                    $message = null;

                    if ($error->keyword() === 'format') {
                        $message = $this->determineFormatError($error);

                    } else if ($error->keyword() === 'patternProperties' && $error->subErrorsCount() > 0) {
                        // Take the first subError and determine the error
                        $subError = $error->subErrors()[0];

                        if ($subError->keyword() === 'format') {
                            $message = $this->determineFormatError($subError);
                        }

                    } else if($error->keyword() === 'minLength') {
                        [$minLength] = array_values($error->keywordArgs());
                        $message = 'Dit veld dient minimaal ' . $minLength . ' karakters te bevatten';
                    }

                    $result[$key] = $result[$key] ?? [];
                    $result[$key][] = $this->translator->trans($message ?? 'form.invalid_value');
                } else {
                    // Required keys are missing
                    if ($error->keyword() === 'required') {
                        // Remove the named key
                        [$key] = array_values($error->keywordArgs());
                        $result[$key][] = $this->translator->trans('form.required_field');
                    }
                }
                return $result;
            }, []),
        ];

        if (getenv('APP_ENV') === 'dev') {
            $responseData['raw_errors'] = array_map(function (ValidationError $error) {
                return [
                    'keyword'      => $error->keyword(),
                    'data_pointer' => $error->dataPointer(),
                    'keyword_args' => $error->keywordArgs(),
                ];
            }, $this->getErrors());
        }

        return new JsonResponse($responseData, 422);
    }

    /**
     * @param ValidationError $error
     * @return null|string
     */
    private function determineFormatError(ValidationError $error): ?string
    {
        $arguments = $error->keywordArgs();
        $formatterName = $arguments['format'];

        /** @var ValidationFormat $formatter */
        $formatter = $this->formatContainer->get('string', $formatterName);

        if ($formatter instanceof ValidationFormat) {
            return $formatter->message();
        }

        return null;
    }
}
