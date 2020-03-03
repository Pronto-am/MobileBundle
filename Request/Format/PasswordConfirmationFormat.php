<?php

namespace Pronto\MobileBundle\Request\Format;


use Pronto\MobileBundle\Request\BaseRequest;

class PasswordConfirmationFormat extends ValidationFormat
{
    /**
     * @var BaseRequest $request
     */
    private $request;

    /**
     * @var string $field
     */
    private $field;

    /**
     * @var string $confirmation
     */
    private $confirmation;

    /**
     * PasswordConfirmationFormat constructor.
     * @param BaseRequest $request
     * @param string $field
     * @param string $confirmation
     */
    public function __construct(BaseRequest $request, string $field, string $confirmation)
    {
        $this->request = $request;
        $this->field = $field;
        $this->confirmation = $confirmation;
    }

    /**
     * @inheritDoc
     */
    public function validate($data): bool
    {
        return $this->request->get($this->field) === $this->request->get($this->confirmation);
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
        return 'same';
    }

    /**
     * @return string|null
     */
    public function message(): ?string
    {
        return 'De velden komen niet overeen';
    }
}
