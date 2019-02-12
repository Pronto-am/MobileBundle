<?php

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * Class AppVersion
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="app_versions")
 */
class AppVersion extends TimestampedEntity implements ApiEntityInterface
{
	use ApiEntityTrait;

	public const FILE_NOT_FOUND = [404, 1, 'Version file not found'];

	/**
	 * @var int|null $id
	 *
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 *
	 * @Groups({"AppVersion"})
	 */
	private $id;

	/**
	 * @var Application $application
	 *
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
	 * @ORM\JoinColumn(onDelete="CASCADE")
	 */
	private $application;

	/**
	 * @var string $version
	 *
	 * @ORM\Column(type="string")
	 */
	private $version;

	/**
	 * @var DateTime $releaseDate
	 *
	 * @ORM\Column(type="date")
	 */
	private $releaseDate;

	/**
	 * @var string $platform
	 *
	 * @ORM\Column(type="string")
	 */
	private $platform;

	/**
	 * @var bool $required
	 *
	 * @ORM\Column(type="boolean")
	 */
	private $required = false;

	/**
	 * @var array $description
	 *
	 * @ORM\Column(type="json_array", nullable=true)
	 */
	private $description;

	/**
	 * @var string $url
	 *
	 * @ORM\Column(type="string")
	 */
	private $url;

	/**
	 * @var string $fileName
	 *
	 * @ORM\Column(type="string")
	 */
	private $fileName;

	/**
	 * @return int|null
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * @return Application
	 */
	public function getApplication(): Application
	{
		return $this->application;
	}

	/**
	 * @param Application $application
	 * @return AppVersion
	 */
	public function setApplication(Application $application): AppVersion
	{
		$this->application = $application;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getVersion(): string
	{
		return $this->version;
	}

	/**
	 * @param string $version
	 * @return AppVersion
	 */
	public function setVersion(string $version): AppVersion
	{
		$this->version = $version;
		return $this;
	}

	/**
	 * @return DateTime
	 */
	public function getReleaseDate(): DateTime
	{
		return $this->releaseDate;
	}

	/**
	 * @param DateTime $releaseDate
	 * @return AppVersion
	 */
	public function setReleaseDate(DateTime $releaseDate): AppVersion
	{
		$this->releaseDate = $releaseDate;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getPlatform(): string
	{
		return $this->platform;
	}

	/**
	 * @param string $platform
	 * @return AppVersion
	 */
	public function setPlatform(string $platform): AppVersion
	{
		$this->platform = $platform;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function isRequired(): bool
	{
		return $this->required;
	}

	/**
	 * @param bool $required
	 * @return AppVersion
	 */
	public function setRequired(bool $required): AppVersion
	{
		$this->required = $required;
		return $this;
	}

	/**
	 * @return array
	 */
	public function getDescription(): array
	{
		return $this->description;
	}

	/**
	 * @param array $description
	 * @return AppVersion
	 */
	public function setDescription(array $description): AppVersion
	{
		$this->description = $description;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getUrl(): string
	{
		return $this->url;
	}

	/**
	 * @param string $url
	 * @return AppVersion
	 */
	public function setUrl(string $url): AppVersion
	{
		$this->url = $url;
		return $this;
	}

	/**
	 * @return string|UploadedFile
	 */
	public function getFileName()
	{
		return $this->fileName;
	}

	/**
	 * @param UploadedFile|string $fileName
	 * @return AppVersion
	 */
	public function setFileName($fileName): AppVersion
	{
		$this->fileName = $fileName;
		return $this;
	}
}