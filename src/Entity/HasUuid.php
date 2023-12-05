<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use Ramsey\Uuid\Uuid;
use Doctrine\ORM\Mapping as ORM;

trait HasUuid
{
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 36)]
    protected string $id;

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }
}
