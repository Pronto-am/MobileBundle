<?php

namespace Pronto\MobileBundle\Service;

use Symfony\Component\HttpFoundation\Request;

class RequestBodyValidator
{
    private array $missing = [];

    public function isValid(Request $request, array $required): bool
    {
        $jsonKeys = array_keys($request->request->all());

        // Get the missing keys
        $this->missing = array_diff($required, $jsonKeys);

        return empty($this->missing);
    }

    public function getMessage(): string
    {
        if (empty($this->missing)) {
            return 'All required keys are present';
        }

        return 'Not all required keys are present, please provide: ' . implode(', ', $this->missing);
    }
}
