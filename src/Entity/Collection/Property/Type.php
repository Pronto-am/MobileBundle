<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Collection\Property;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Type
 * @package Pronto\MobileBundle\Entity
 */
#[ORM\Table(name: 'collection_property_types')]
#[ORM\Entity]
class Type
{
    // Set the types as publicly accessible variables
    public const TYPE_TEXT = 'text';
    public const TYPE_MULTILINE_TEXT = 'multilineText';
    public const TYPE_HTML_TEXT = 'htmlText';
    public const TYPE_SELECT = 'select';
    public const TYPE_DATE = 'date';
    public const TYPE_DATE_TIME = 'dateTime';
    public const TYPE_BOOLEAN = 'boolean';
    public const TYPE_URL = 'url';
    public const TYPE_NUMBER = 'number';
    public const TYPE_JSON = 'json';
    public const TYPE_COORDINATES = 'coordinates';
    public const TYPE_FILE = 'file';

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string')]
    private $type;

    #[ORM\Column(type: 'boolean')]
    private $translatable = false;

    #[ORM\Column(type: 'boolean')]
    private $listviewCompatible = false;

    #[ORM\Column(type: 'boolean')]
    private $jsonListviewCompatible = false;

    #[ORM\Column(type: 'smallint')]
    private $ordering;

    #[ORM\Column(type: 'json')]
    private $config;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
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
     */
    public function setType(string $type): void
    {
        $this->type = $type;
    }

    /**
     * @return boolean
     */
    public function getTranslatable(): bool
    {
        return $this->translatable;
    }

    /**
     * @param bool $translatable
     */
    public function setTranslatable(bool $translatable): void
    {
        $this->translatable = $translatable;
    }

    /**
     * @return boolean
     */
    public function getListviewCompatible(): bool
    {
        return $this->listviewCompatible;
    }

    /**
     * @param bool $listviewCompatible
     */
    public function setListviewCompatible(bool $listviewCompatible): void
    {
        $this->listviewCompatible = $listviewCompatible;
    }

    /**
     * @return bool
     */
    public function getJsonListviewCompatible(): bool
    {
        return $this->jsonListviewCompatible;
    }

    /**
     * @param bool $jsonListviewCompatible
     */
    public function setJsonListviewCompatible(bool $jsonListviewCompatible): void
    {
        $this->jsonListviewCompatible = $jsonListviewCompatible;
    }

    /**
     * @return int
     */
    public function getOrdering(): int
    {
        return $this->ordering;
    }

    /**
     * @param int $ordering
     */
    public function setOrdering(int $ordering): void
    {
        $this->ordering = $ordering;
    }

    /**
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @param array $config
     */
    public function setConfig(array $config): void
    {
        $this->config = $config;
    }
}
