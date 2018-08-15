<?php

namespace Pronto\MobileBundle\Entity\Collection;

use Pronto\MobileBundle\Entity\Collection\Property\Type;
use Pronto\MobileBundle\Entity\TimestampedEntity;
use Doctrine\ORM\Mapping as ORM;


/**
 * Class Property
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Collection\PropertyRepository")
 * @ORM\Table(name="collection_properties")
 */
class Property extends TimestampedEntity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection", inversedBy="properties")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $collection;


	/**
	 * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Collection\Property\Type")
	 * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
	 */
	private $type;


    /**
     * @ORM\Column(type="string")
     */
    private $name;


	/**
	 * @ORM\Column(type="string")
	 */
	private $identifier;


    /**
     * @ORM\Column(type="json_array")
     */
    private $config;


    /**
     * @ORM\Column(type="boolean")
    */
    private $required = true;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $includeInListView = true;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $includeInJsonListView = true;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $entryTitle = false;


	/**
	 * @ORM\Column(type="integer")
	 */
	private $ordering;


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
    public function getCollection()
    {
        return $this->collection;
    }


    /**
     * @param mixed $collection
     */
    public function setCollection($collection): void
    {
        $this->collection = $collection;
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
     * @return Type
     */
    public function getType(): Type
    {
        return $this->type;
    }


    /**
     * @param mixed $type
     */
    public function setType($type): void
    {
        $this->type = $type;
    }


	/**
	 * @return mixed
	 */
	public function getConfig()
	{
		return $this->config;
	}


	/**
	 * @param mixed $config
	 */
	public function setConfig($config): void
	{
		$this->config = $config;
	}


    /**
     * @return mixed
     */
    public function getRequired()
    {
        return $this->required;
    }


    /**
     * @param mixed $required
     */
    public function setRequired($required): void
    {
        $this->required = $required;
    }


	/**
	 * @return mixed
	 */
	public function getIncludeInListView()
	{
		return $this->includeInListView;
	}


	/**
	 * @param mixed $includeInListView
	 */
	public function setIncludeInListView($includeInListView): void
	{
		$this->includeInListView = $includeInListView;
	}


	/**
	 * @return bool
	 */
	public function getIncludeInJsonListView(): bool
	{
		return $this->includeInJsonListView;
	}


	/**
	 * @param mixed $includeInJsonListView
	 */
	public function setIncludeInJsonListView($includeInJsonListView): void
	{
		$this->includeInJsonListView = $includeInJsonListView;
	}


	/**
	 * @return mixed
	 */
	public function getEntryTitle()
	{
		return $this->entryTitle;
	}


	/**
	 * @param mixed $entryTitle
	 */
	public function setEntryTitle($entryTitle): void
	{
		$this->entryTitle = $entryTitle;
	}


	/**
	 * @return mixed
	 */
	public function getOrdering()
	{
		return $this->ordering;
	}


	/**
	 * @param mixed $ordering
	 */
	public function setOrdering($ordering): void
	{
		$this->ordering = $ordering;
	}
}