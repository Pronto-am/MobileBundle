<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Utils\ErrorResponse;
use Symfony\Component\Validator\Constraints as Assert;
use Pronto\MobileBundle\Traits\ApiEntityTrait;


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
     */
    private $id;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
    private $name;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $identifier;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
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
     */
    private $properties;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection\Entry", mappedBy="collection")
	 */
	private $entries;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection\Relationship", mappedBy="collection")
	 */
	private $relationships;


    public function __construct()
    {
        $this->properties = new ArrayCollection();
        $this->entries = new ArrayCollection();
    }


    /**
     * @return int
     */
    public function getId(): int
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
	 * @return ArrayCollection
	 */
	public function getProperties(): ArrayCollection
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
	 * @return ArrayCollection
	 */
	public function getEntries(): ArrayCollection
	{
		return $this->entries;
	}


	/**
	 * @return ArrayCollection
	 */
	public function getRelationships(): ArrayCollection
	{
		return $this->relationships;
	}
}