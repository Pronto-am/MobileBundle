<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Application\ApplicationClient;
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

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     *
     * @Groups({"AppVersion"})
     */
    private ?int $id;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private Application $application;

    /**
     * @ORM\Column(type="string")
     */
    private string $version;

    /**
     * @ORM\Column(type="date")
     */
    private DateTime $releaseDate;

    /**
     * @ORM\Column(type="string")
     */
    private string $platform;

    /**
     * @ORM\Column(type="boolean")
     */
    private bool $required = false;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private ?array $description;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $url;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $fileName;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getApplication(): Application
    {
        return $this->application;
    }

    public function setApplication(Application $application): AppVersion
    {
        $this->application = $application;
        return $this;
    }

    public function getVersion(): string
    {
        return $this->version;
    }

    public function setVersion(string $version): AppVersion
    {
        $this->version = $version;
        return $this;
    }

    public function getReleaseDate(): DateTime
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(DateTime $releaseDate): AppVersion
    {
        $this->releaseDate = $releaseDate;
        return $this;
    }

    public function getPlatform(): string
    {
        return $this->platform;
    }

    public function setPlatform(string $platform): AppVersion
    {
        $this->platform = $platform;
        return $this;
    }

    public function isRequired(): bool
    {
        return $this->required;
    }

    public function setRequired(bool $required): AppVersion
    {
        $this->required = $required;
        return $this;
    }

    public function getDescription(): array
    {
        return $this->description;
    }

    public function setDescription(?array $description = null): AppVersion
    {
        $this->description = $description;
        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): AppVersion
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
     */
    public function setFileName($fileName): AppVersion
    {
        $this->fileName = $fileName;
        return $this;
    }
}
