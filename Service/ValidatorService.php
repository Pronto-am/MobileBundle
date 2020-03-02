<?php

namespace Pronto\MobileBundle\Service;

use Opis\JsonSchema\FormatContainer;
use Opis\JsonSchema\IFormat;
use Opis\JsonSchema\Schema;
use Opis\JsonSchema\Validator;
use Pronto\MobileBundle\Exception\InvalidRequestException;
use Pronto\MobileBundle\Request\Format\ValidationFormat;
use Symfony\Component\HttpFoundation\ParameterBag;

class ValidatorService
{
    /**
     * @var Validator $validator
     */
    private $validator;

    /**
     * ValidatorService constructor.
     */
    public function __construct()
    {
        $this->validator = new Validator();
    }

    /**
     * @param ValidationFormat[] $formats
     */
    public function useFormats(array $formats)
    {
        $formatContainer = new FormatContainer();

        foreach($formats as $format) {
            $formatContainer->add($format->dataType(), $format->name(), $format);
        }

        $this->validator->setFormats($formatContainer);
    }

    /**
     * @param ParameterBag $parameterBag
     * @param array $required
     * @param array $rules
     * @throws InvalidRequestException
     */
    public function validate(ParameterBag $parameterBag, array $required, array $rules = []): void
    {
        $values = $this->parseToObject($parameterBag->all());

        // Validate the request
        $result = $this->validator->schemaValidation($values, Schema::fromJsonString(json_encode([
            'type'       => 'object',
            'properties' => $this->parseToObject($rules),
            'required'   => $required
        ])), -1); // -1 is PHP_MAX_INT

        if (!$result->isValid()) {
            throw new InvalidRequestException($result->getErrors(), $this->validator->getFormats());
        }
    }

    /**
     * @param array $array
     * @return object
     */
    private function parseToObject(array $array)
    {
        return (object) json_decode(json_encode($array));
    }
}
