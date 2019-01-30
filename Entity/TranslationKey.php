<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class TranslationKey
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="devices")
 */
class TranslationKey implements ApiEntityInterface
{
	use ApiEntityTrait;

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 * @Groups({"TranslationKey"})
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 * @Groups({"TranslationKey"})
	 */
	private $application;

	/**
	 * @var string $key
	 *
	 * @ORM\Column(type="string")
	 * @Groups({"TranslationKey"})
	 */
	private $key;

	/**
	 * @var int $type
	 *
	 * @ORM\Column(type="smallint")
	 * @Groups({"TranslationKey"})
	 */
	private $type;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Translation", mappedBy="translationKey")
	 */
	private $translations;

	/**
	 * TranslationKey constructor.
	 * @param string $key
	 */
	public function __construct(string $key)
	{
		$this->key = $key;
	}

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
	public function getKey(): string
	{
		return $this->key;
	}

	/**
	 * @param string $key
	 * @return TranslationKey
	 */
	public function setKey(string $key): self
	{
		$this->key = $key;
		return $this;
	}

	/**
	 * @return int
	 */
	public function getType(): int
	{
		return $this->type;
	}

	/**
	 * @param int $type
	 * @return TranslationKey
	 */
	public function setType(int $type): TranslationKey
	{
		$this->type = $type;
		return $this;
	}

	/**
	 * @return array
	 */
	public function getTranslations(): array
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