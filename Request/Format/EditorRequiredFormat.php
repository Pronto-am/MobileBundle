<?php

namespace Pronto\MobileBundle\Request\Format;


class EditorRequiredFormat extends ValidationFormat
{
    /**
     * @inheritDoc
     */
    public function validate($data): bool
    {
        // The editor always sends empty paragraph tags, this should be considered an empty field
        if ($data === '<p></p>') {
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
        return 'editor_required';
    }

    public function message(): ?string
    {
        return 'Dit veld is verplicht';
    }
}
