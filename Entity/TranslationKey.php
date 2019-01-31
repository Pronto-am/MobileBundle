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
class TranslationKey implements ApiEntityInterface
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
	 * @var string $type
	 *
	 * @ORM\Column(type="string")
	 * @Groups({"TranslationKey"})
	 */
	private $type;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Translation", mappedBy="translationKey")
	 * @Groups({"TranslationKey"})
	 */
	private $translations;

	/**
	 * @return int
	 */
	public function getId(): int
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