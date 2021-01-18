<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Validator\Constraints\Config;

use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Enum\VariableType;
use Pronto\MobileBundle\Validator\Constraints\ConstraintValidator;
use Symfony\Component\Validator\Constraint;

class IsUniqueIdentifierValidator extends ConstraintValidator
{
    public function requiresInstanceOf(): string
    {
        return IsUniqueIdentifier::class;
    }

    public function valueIsOfType(): VariableType
    {
        return VariableType::STRING();
    }

    public function handle($value, Constraint $constraint): void
    {
        $data = $this->request->request->get('remote_config_form');
        $id = (int) $data['id'];
        $id = $id > 0 ? $id : null;

        // Determine whether the identifier is already being used
        $isUnique = $this->entityManager->getRepository(RemoteConfig::class)->isUnique($this->prontoMobile->getApplication(), $value, $id);

        if (!$isUnique) {
            $this->context->buildViolation($this->getErrorMessage())->addViolation();
        }
    }
}
