<?php

namespace Pronto\MobileBundle\Entity\Collection\Relationship;

use Pronto\MobileBundle\Entity\TimestampedEntity;
use Doctrine\ORM\Mapping as ORM;


/**
 * Class Type
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="collection_relationship_types")
 */
class Type
{
    /**
     * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\Column(type="string")
     */
    private $name;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $hasMany = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $canBeEmpty = false;


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
	public function hasMany()
	{
		return $this->hasMany;
	}


	/**
	 * @param mixed $hasMany
	 */
	public function setHasMany($hasMany): void
	{
		$this->hasMany = $hasMany;
	}


	/**
	 * @return mixed
	 */
	public function canBeEmpty()
	{
		return $this->canBeEmpty;
	}


	/**
	 * @param mixed $canBeEmpty
	 */
	public function setCanBeEmpty($canBeEmpty): void
	{
		$this->canBeEmpty = $canBeEmpty;
	}
}