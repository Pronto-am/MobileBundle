<?php

namespace Pronto\MobileBundle\Exception;

use Exception;
use Opis\JsonSchema\FormatContainer;
use Opis\JsonSchema\ValidationError;
use Pronto\MobileBundle\Request\Format\ValidationFormat;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class InvalidRequestException extends Exception
{
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
     * @param ValidationError[] $errors
     * @param FormatContainer $formatContainer
     * @param Throwable|null $previous
     */
    public function __construct(array $errors, FormatContainer $formatContainer, Throwable $previous = null)
    {
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
        return new JsonResponse([
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

                        if($subError->keyword() === 'format') {
                            $message = $this->determineFormatError($subError);
                        }
                    }

                    $result[$key] = $result[$key] ?? [];
                    $result[$key][] = $message ?? 'Dit veld is ongeldig';
                } else {
                    // Required keys are missing
                    if ($error->keyword() === 'required') {
                        // Remove the named key
                        [$key] = array_values($error->keywordArgs());
                        $result[$key][] = 'Dit veld is verplicht';
                    }
                }
                return $result;
            }, []),
        ], 422);
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

        if($formatterName instanceof ValidationFormat) {
            return $formatter->message();
        }

        return null;
    }
}
