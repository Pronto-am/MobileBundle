<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\Config;

use Pronto\MobileBundle\Enum\RemoteConfigType;
use Pronto\MobileBundle\Enum\VariableType;
use Pronto\MobileBundle\Validator\Constraints\ConstraintValidator;
use Symfony\Component\Validator\Constraint;

class IsValidForTypeValidator extends ConstraintValidator
{
    protected bool $skipNullValues = false;

    public function requiresInstanceOf(): string
    {
        return IsValidForType::class;
    }

    public function valueIsOfType(): ?VariableType
    {
        return null;
    }

    public function handle($value, Constraint $constraint): void
    {
        $data = $this->request->request->get('remote_config_form');

        $options = $data['options'][$data['type']] ?? [];
        $value = $data['value'][$data['type']] ?? null;

        if (!$this->isValid(new RemoteConfigType($data['type']), $value, $options)) {
            $this->context->buildViolation($this->getErrorMessage())->addViolation();
        }
    }

    private function isValid(RemoteConfigType $type, $value = null, $options = null): bool
    {
        if ($type->equals(RemoteConfigType::INTEGER())) {
            $float = (float) $value;

            if (isset($options['min']) && $float < (float) $options['min']) {
                return false;
            }

            if (isset($options['max']) && $float > (float) $options['max']) {
                return false;
            }

            // Validate the step size of the number
            if (isset($options['step'])) {
                $normalized = round($float / (float) $options['step']) * (float) $options['step'];

                // There could be a minor difference, hence the: 0.000001
                if (abs($normalized - $float) > 0.000001) {
                    return false;
                }
            }
        } else if ($type->equals(RemoteConfigType::JSON())) {
            json_decode($value);

            return json_last_error() === JSON_ERROR_NONE;
        }

        return true;
    }
}
