<?php


namespace Pronto\MobileBundle\Request\Format;


use Opis\JsonSchema\IFormat;

abstract class ValidationFormat implements IFormat
{
    /**
     * JSON data type
     * @return string
     */
    public abstract function dataType(): string;

    /**
     * Name of the custom format
     * @return string
     */
    public abstract function name(): string;

    /**
     * @return string|null
     */
    public function message(): ?string
    {
        return null;
    }
}
