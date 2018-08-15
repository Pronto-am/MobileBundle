<?php

namespace Pronto\MobileBundle\Entity\Collection\Property;

use Doctrine\ORM\Mapping as ORM;


/**
 * Class Type
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Pronto\MobileBundle\Repository\Collection\Property\TypeRepository")
 * @ORM\Table(name="collection_property_types")
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
    private $type;


	/**
	 * @ORM\Column(type="boolean")
	 */
    private $translatable = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $listviewCompatible = false;


	/**
	 * @ORM\Column(type="boolean")
	 */
	private $jsonListviewCompatible = false;


	/**
	 * @ORM\Column(type="smallint")
	 */
	private $ordering;


	/**
	 * @ORM\Column(type="json_array")
	 */
    private $config;


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
    public function getType()
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
	 * @return boolean
	 */
	public function getTranslatable(): bool
	{
		return $this->translatable;
	}


	/**
	 * @param mixed $translatable
	 */
	public function setTranslatable($translatable): void
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
	 * @param mixed $listviewCompatible
	 */
	public function setListviewCompatible($listviewCompatible): void
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
	 * @param mixed $jsonListviewCompatible
	 */
	public function setJsonListviewCompatible($jsonListviewCompatible): void
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
	 * @param mixed $ordering
	 */
	public function setOrdering($ordering): void
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
	 * @param mixed $config
	 */
	public function setConfig($config): void
	{
		$this->config = $config;
	}
}