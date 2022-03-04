<?php

namespace Pronto\MobileBundle\Utils\Responses;

class SuccessResponse extends BaseResponse
{
    public function __construct(?array $data = null)
    {
        $this->setStatus(200);

        if ($data !== null) {
            $this->setData($data);
        }
    }

    public function create(): ResponseInterface
    {
        $response = [];

        if ($this->getData() !== null) {
            $response['data'] = is_string($this->getData()) ? json_decode($this->getData()) : $this->getData();
        }

        if ($this->getMessage() !== null) {
            $response['message'] = $this->getMessage();
        }

        $this->setContent($response);

        return $this;
    }
}
