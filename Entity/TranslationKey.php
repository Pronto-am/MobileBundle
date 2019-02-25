<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class TranslationKey
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="translation_keys")
 */
class TranslationKey extends TimestampedEntity implements ApiEntityInterface
{
	use ApiEntityTrait;

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $application;

	/**
	 * @var string $identifier
	 *
	 * @ORM\Column(type="string")
	 * @Groups({"TranslationKey"})
	 */
	private $identifier;

	/**
	 * @var string|null $description
	 *
	 * @ORM\Column(type="string", nullable=true)
	 * @Groups({"TranslationKey"})
	 */
	private $description;

	/**
	 * @var string $type
	 *
	 * @ORM\Column(type="string")
	 * @Groups({"TranslationKey"})
	 */
	private $type;

	/**
	 * @var boolean $android
	 *
	 * @ORM\Column(type="boolean")
	 * @Groups({"TranslationKey"})
	 */
	private $android;

	/**
	 * @var boolean $ios
	 *
	 * @ORM\Column(type="boolean")
	 * @Groups({"TranslationKey"})
	 */
	private $ios;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Translation", mappedBy="translationKey")
	 * @Groups({"TranslationKey"})
	 */
	private $translations;

	/**
	 * @return int|null
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * @param Application $application
	 * @return TranslationKey
	 */
	public function setApplication(Application $application): self
	{
		$this->application = $application;
		return $this;
	}

	/**
	 * @return Application
	 */
	public function getApplication(): Application
	{
		return $this->application;
	}

	/**
	 * @return string
	 */
	public function getIdentifier(): string
	{
		return $this->identifier;
	}

	/**
	 * @param string $identifier
	 * @return TranslationKey
	 */
	public function setIdentifier(string $identifier): self
	{
		$this->identifier = $identifier;
		return $this;
	}

	/**
	 * @return string|null
	 */
	public function getDescription(): ?string
	{
		return $this->description;
	}

    /**
     * @param string|null $description
     * @return TranslationKey
     */
	public function setDescription(?string $description): TranslationKey
	{
		$this->description = $description;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getType(): string
	{
		return $this->type;
	}

	/**
	 * @param string $type
	 * @return TranslationKey
	 */
	public function setType(string $type): TranslationKey
	{
		$this->type = $type;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function isAndroid(): bool
	{
		return $this->android;
	}

	/**
	 * @param bool $android
	 * @return TranslationKey
	 */
	public function setAndroid(bool $android): TranslationKey
	{
		$this->android = $android;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function isIos(): bool
	{
		return $this->ios;
	}

	/**
	 * @param bool $ios
	 * @return TranslationKey
	 */
	public function setIos(bool $ios): TranslationKey
	{
		$this->ios = $ios;
		return $this;
	}

	/**
	 * @return PersistentCollection
	 */
	public function getTranslations(): PersistentCollection
	{
		return $this->translations;
	}

	/**
	 * @param array $translations
	 * @return TranslationKey
	 */
	public function setTranslations(array $translations): self
	{
		$this->translations = $translations;
		return $this;
	}
}