<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Traits\ApiEntityTrait;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Collection
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="collections")
 */
class Collection extends TimestampedEntity implements ApiEntityInterface
{
	use ApiEntityTrait;

	/**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @Groups({"Collection"})
     */
    private $id;

	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
     * @Groups({"Collection"})
     */
    private $name;

	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
     * @Groups({"Collection"})
	 */
	private $identifier;

	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
     * @Groups({"Collection"})
	 */
	private $icon;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application\Version")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $applicationVersion;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection\Property", mappedBy="collection")
	 * @ORM\OrderBy({"ordering" = "ASC"})
     * @Groups({"Collection"})
     */
    private $properties;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection\Entry", mappedBy="collection")
	 */
	private $entries;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection\Relationship", mappedBy="collection")
     * @Groups({"Collection"})
     */
    private $relationships;

    /**
     * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection\Relationship", mappedBy="relatedCollection")
     */
    private $inversedRelationships;

    public function __construct()
    {
        $this->properties = new ArrayCollection();
        $this->entries = new ArrayCollection();
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Version
     */
    public function getApplicationVersion(): Version
    {
        return $this->applicationVersion;
    }

    /**
     * @param Version $applicationVersion
     */
    public function setApplicationVersion(Version $applicationVersion): void
    {
        $this->applicationVersion = $applicationVersion;
    }

	/**
	 * @return string
	 */
	public function getName(): string
	{
		return $this->name;
	}

	/**
	 * @param mixed $name
	 */
	public function setName(string $name): void
	{
		$this->name = $name;
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
	 */
	public function setIdentifier(string $identifier): void
	{
		$this->identifier = $identifier;
	}

	/**
	 * @return string
	 */
	public function getIcon(): string
	{
		return $this->icon;
	}

	/**
	 * @param string $icon
	 */
	public function setIcon(string $icon): void
	{
		$this->icon = $icon;
	}

	/**
	 * @return DoctrineCollection
	 */
	public function getProperties(): DoctrineCollection
	{
		return $this->properties;
	}

	/**
	 * JUST FOR TESTING PURPOSES
	 *
	 * @param ArrayCollection $properties
	 */
	public function setProperties(ArrayCollection $properties): void
	{
		$this->properties = $properties;
	}

	/**
	 * @return DoctrineCollection
	 */
	public function getEntries(): DoctrineCollection
	{
		return $this->entries;
	}

	/**
	 * @return DoctrineCollection
	 */
	public function getRelationships(): DoctrineCollection
	{
		return $this->relationships;
	}

    /**
     * @return DoctrineCollection
     */
	public function getInversedRelationships(): DoctrineCollection
    {
        return $this->inversedRelationships;
    }
}
