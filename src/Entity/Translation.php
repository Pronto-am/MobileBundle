<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Pronto\MobileBundle\Traits\ApiEntityTrait;

/**
 * Class Translation
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="translations")
 * @ORM\HasLifecycleCallbacks
 */
class Translation implements ApiEntityInterface
{
	use ApiEntityTrait;

	/**
	 * @var string $id
	 *
	 * @ORM\Id
	 * @ORM\Column(type="string", length=191, unique=true)
	 * @Groups({"Translation"})
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\TranslationKey", inversedBy="translations")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 * @Groups({"Translation"})
	 */
	private $translationKey;

	/**
	 * @var string $language
	 *
	 * @ORM\Column(type="string")
	 * @Groups({"Translation", "TranslationKey"})
	 */
	private $language;

	/**
	 * @var null|string $text
	 *
	 * @ORM\Column(type="text", nullable=true)
	 * @Groups({"Translation", "TranslationKey"})
	 */
	private $text;

	/**
	 * Triggered on pre persist
	 *
	 * @ORM\PrePersist
	 * @throws \Exception
	 */
	public function onPrePersist(): void
	{
		$this->id = Uuid::uuid1()->toString();
	}

	/**
	 * @return string|null
	 */
	public function getId(): ?string
	{
		return $this->id;
	}

	/**
	 * @param TranslationKey $key
	 * @return Translation
	 */
	public function setTranslationKey(TranslationKey $key): self
	{
		$this->translationKey = $key;
		return $this;
	}

	/**
	 * @return TranslationKey
	 */
	public function getTranslationKey(): TranslationKey
	{
		return $this->translationKey;
	}

	/**
	 * @param string $language
	 * @return Translation
	 */
	public function setLanguage(string $language): self
	{
		$this->language = $language;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getLanguage(): string
	{
		return $this->language;
	}

	/**
	 * @return string|null
	 */
	public function getText(): ?string
	{
		return $this->text;
	}

	/**
	 * @param null|string $text
	 * @return Translation
	 */
	public function setText(?string $text): self
	{
		$this->text = $text;
		return $this;
	}
}