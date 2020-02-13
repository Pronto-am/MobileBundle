<?php

namespace Pronto\MobileBundle\Exception;

use Exception;
use Opis\JsonSchema\ValidationError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class InvalidRequestException extends Exception
{
    /**
     * @var array $errors
     */
    private $errors;


    /**
     * InvalidRequestException constructor.
     * @param array $errors
     * @param Throwable|null $previous
     */
    public function __construct(array $errors, Throwable $previous = null)
    {
        $this->errors = $errors;

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

                    $result[$key] = $result[$key] ?? [];
                    $result[$key][] = $key . ' is ongeldig';
                } else {
                    // Required keys are missing
                    if($error->keyword() === 'required') {
                        // Remove the named key
                        [$key] = array_values($error->keywordArgs());
                        $result[$key][] = $key . ' is verplicht';
                    }
                }
                return $result;
            }, []),
        ], 422);
    }
}
