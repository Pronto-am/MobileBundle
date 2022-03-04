<?php

namespace Pronto\MobileBundle\Utils\Responses;

use Symfony\Component\HttpFoundation\JsonResponse;

class BaseResponse implements ResponseInterface
{
    private string $message;
    private array $data;
    private int $status;
    private array $content;

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): ResponseInterface
    {
        $this->message = $message;

        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setData(?array $data): ResponseInterface
    {
        $this->data = $data;
        return $this;
    }

    public function setContent(array $content): void
    {
        $this->content = $content;
    }

    public function create(): ResponseInterface
    {
        $this->content = [];
        return $this;
    }

    public function getJsonResponse(): JsonResponse
    {
        // Return a new JsonResponse
        return new JsonResponse($this->content, $this->getStatus());
    }

    public function getStatus(): int
    {
        return $this->status;
    }

    public function setStatus(int $status): ResponseInterface
    {
        $this->status = $status;
        return $this;
    }
}
