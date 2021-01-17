<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use Symfony\Component\Uid\Uuid;

trait HasUuid
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=36)
     */
    protected $id;

    public function __construct()
    {
        $this->id = Uuid::v4()->toRfc4122();
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
