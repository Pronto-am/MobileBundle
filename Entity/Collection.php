<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
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
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }


    /**
     * @return mixed
     */
    public function getApplicationVersion()
    {
        return $this->applicationVersion;
    }


    /**
     * @param mixed $applicationVersion
     */
    public function setApplicationVersion($applicationVersion): void
    {
        $this->applicationVersion = $applicationVersion;
    }


	/**
	 * @return mixed
	 */
	public function getName()
	{
		return $this->name;
	}


	/**
	 * @param mixed $name
	 */
	public function setName($name): void
	{
		$this->name = $name;
	}


	/**
	 * @return mixed
	 */
	public function getIdentifier()
	{
		return $this->identifier;
	}


	/**
	 * @param mixed $identifier
	 */
	public function setIdentifier($identifier): void
	{
		$this->identifier = $identifier;
	}


	/**
	 * @return mixed
	 */
	public function getIcon()
	{
		return $this->icon;
	}


	/**
	 * @param mixed $icon
	 */
	public function setIcon($icon): void
	{
		$this->icon = $icon;
	}


	/**
	 * @return mixed
	 */
	public function getProperties()
	{
		return $this->properties;
	}


	/**
	 * JUST FOR TESTING PURPOSES
	 *
	 * @param mixed $properties
	 */
	public function setProperties($properties): void
	{
		$this->properties = $properties;
	}


	/**
	 * @return mixed
	 */
	public function getEntries()
	{
		return $this->entries;
	}


	/**
	 * @return mixed
	 */
	public function getRelationships()
	{
		return $this->relationships;
	}
}