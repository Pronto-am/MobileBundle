<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Class RemoteConfig
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'remote_config')]
#[ORM\Entity(repositoryClass: 'Pronto\MobileBundle\Repository\RemoteConfigRepository')]
class RemoteConfig extends TimestampedEntity implements ApiEntityInterface
{
    use ApiEntityTrait;

    /**
     * @var int|null $id
     *
     */
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    #[Groups(['RemoteConfig'])]
    private $id;

    /**
     * @var Application $application
     */
    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Application')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private $application;

    /**
     * @var DateTime $releaseDate
     */
    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['RemoteConfig'])]
    private $releaseDate;

    /**
     * @var boolean $android
     */
    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['RemoteConfig'])]
    private $android;

    /**
     * @var boolean $ios
     */
    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(['RemoteConfig'])]
    private $ios;

    /**
     * @var string $name
     */
    #[ORM\Column(type: 'string')]
    #[Groups(['RemoteConfig'])]
    private $name;

    /**
     * @var string $identifier
     */
    #[ORM\Column(type: 'string')]
    #[Groups(['RemoteConfig'])]
    private $identifier;

    /**
     * @var string $description
     */
    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['RemoteConfig'])]
    private $description;

    /**
     * @var string $type
     */
    #[ORM\Column(type: 'string')]
    #[Groups(['RemoteConfig'])]
    private $type;

    /**
     * @var array|null $options
     */
    #[ORM\Column(type: 'json', nullable: true)]
    private $options;

    /**
     * @var string $value
     */
    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['RemoteConfig'])]
    private $value;

    /**
     * @var array|null $value
     */
    #[ORM\Column(type: 'json', nullable: true)]
    private $jsonValue;

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
     * @return RemoteConfig
     */
    public function setApplication(Application $application): RemoteConfig
    {
        $this->application = $application;
        return $this;
    }

    /**
     * @return DateTime|null
     */
    public function getReleaseDate(): ?DateTime
    {
        return $this->releaseDate;
    }

    /**
     * @param DateTime|null $releaseDate
     * @return RemoteConfig
     */
    public function setReleaseDate(DateTime $releaseDate = null): RemoteConfig
    {
        $this->releaseDate = $releaseDate;
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
     * @return RemoteConfig
     */
    public function setAndroid(bool $android): RemoteConfig
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
     * @return RemoteConfig
     */
    public function setIos(bool $ios): RemoteConfig
    {
        $this->ios = $ios;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return RemoteConfig
     */
    public function setName(string $name): RemoteConfig
    {
        $this->name = $name;
        return $this;
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
     * @return RemoteConfig
     */
    public function setIdentifier(string $identifier): RemoteConfig
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
     * @return RemoteConfig
     */
    public function setDescription(string $description = null): RemoteConfig
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return array|null
     */
    public function getOptions(): ?array
    {
        return $this->options;
    }

    /**
     * @param array|null $options
     * @return RemoteConfig
     */
    public function setOptions(?array $options): RemoteConfig
    {
        $this->options = $options;
        return $this;
    }

    /**
     * @return string|bool|float|null
     */
    public function getValue()
    {
        if ($this->getType()->equals(RemoteConfigType::INTEGER())) {
            return (float) $this->value;
        } else if ($this->getType()->equals(RemoteConfigType::BOOL())) {
            return (int) $this->value === 1;
        }

        return $this->value;
    }

    /**
     * @param string|int|null $value
     * @return RemoteConfig
     */
    public function setValue($value): RemoteConfig
    {
        $this->value = $value;
        return $this;
    }

    /**
     * @return RemoteConfigType
     */
    public function getType(): RemoteConfigType
    {
        return new RemoteConfigType($this->type);
    }

    /**
     * @param RemoteConfigType $type
     * @return RemoteConfig
     */
    public function setType(RemoteConfigType $type): RemoteConfig
    {
        $this->type = $type->getValue();
        return $this;
    }

    /**
     * @return array|null
     */
    public function getJsonValue(): ?array
    {
        return $this->jsonValue;
    }

    /**
     * @param array|null $jsonValue
     * @return RemoteConfig
     */
    public function setJsonValue(?array $jsonValue): RemoteConfig
    {
        $this->jsonValue = $jsonValue;
        return $this;
    }
}
