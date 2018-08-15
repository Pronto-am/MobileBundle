<?php

namespace Pronto\MobileBundle\Entity\Application;

use Pronto\MobileBundle\Entity\Application;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Version
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="application_versions")
 */
class Version
{

	public const SESSION_IDENTIFIER = '_pronto.applicationVersion';

	/**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application", inversedBy="applicationVersions")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $application;


    /**
     * @ORM\Column(type="string")
	 * @Assert\NotBlank()
     */
    private $name;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Collection", mappedBy="applicationVersion")
	 */
    private $collections;


    /**
     * @return mixed
     */
    public function getId()
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
     * @param mixed $application
     */
    public function setApplication($application): void
	{
        $this->application = $application;
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
    public function setName($name): void
	{
        $this->name = $name;
    }


	/**
	 * @return mixed
	 */
	public function getCollections()
	{
		return $this->collections;
	}
}