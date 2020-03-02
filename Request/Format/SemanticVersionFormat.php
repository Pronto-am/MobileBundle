<?php


namespace Pronto\MobileBundle\Request\Format;


use Opis\JsonSchema\IFormat;

class SemanticVersionFormat extends ValidationFormat
{
    /**
     * @inheritDoc
     */
    public function validate($data): bool
    {
        if (!preg_match('/^\d+.\d+.\d+$/', $data, $matches)) {
            return false;
        }
        return true;
    }

    /**
     * @inheritDoc
     */
    public function dataType(): string
    {
        return 'string';
    }

    /**
     * @inheritDoc
     */
    public function name(): string
    {
        return 'semantic';
    }
}
