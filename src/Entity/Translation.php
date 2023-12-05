<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: 'translations')]
#[ORM\Entity]
#[ORM\HasLifecycleCallbacks]
class Translation implements ApiEntityInterface
{
    use ApiEntityTrait;

    /**
     * @var string $id
     */
    #[ORM\Id]
    #[ORM\Column(type: 'string', length: 191, unique: true)]
    #[Groups(['Translation'])]
    private string $id;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\TranslationKey', inversedBy: 'translations')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['Translation'])]
    private TranslationKey $translationKey;

    /**
     * @var string $language
     */
    #[ORM\Column(type: 'string')]
    #[Groups(['Translation', 'TranslationKey'])]
    private string $language;

    /**
     * @var null|string $text
     */
    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['Translation', 'TranslationKey'])]
    private ?string $text;

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->id = Uuid::uuid1()->toString();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getTranslationKey(): TranslationKey
    {
        return $this->translationKey;
    }

    public function setTranslationKey(TranslationKey $key): self
    {
        $this->translationKey = $key;
        return $this;
    }

    public function getLanguage(): string
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        $this->language = $language;
        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): self
    {
        $this->text = $text;
        return $this;
    }
}
