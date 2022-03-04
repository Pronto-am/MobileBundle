<?php

namespace Pronto\MobileBundle\Utils\Responses;

class PaginatedResponse extends BaseResponse
{
    private array $pagination = [];

    public function __construct()
    {
        $this->setStatus(200);
    }

    public function setPagination(array $pagination): self
    {
        $this->pagination = $pagination;

        return $this;
    }

    public function create(): ResponseInterface
    {
        $response = [];

        if ($this->getData() !== null) {
            $response['data'] = is_string($this->getData()) ? json_decode($this->getData()) : $this->getData();
        }

        $response['pagination'] = $this->pagination;

        $this->setContent($response);

        return $this;
    }
}
