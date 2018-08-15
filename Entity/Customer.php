<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Class Customer
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="customers")
 */
class Customer
{

	public const SESSION_IDENTIFIER = '_pronto.customer';

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
    private $companyName;


    /**
     * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
    private $contactPerson;


    /**
     * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
    private $phoneNumber;


    /**
     * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
    private $email;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
    private $primaryColor;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $secondaryColor;


	/**
	 * @ORM\Column(type="string")
	 * @Assert\NotBlank()
	 */
	private $sidebarColor;


	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Application", mappedBy="customer")
	 */
	private $applications;


	/**
	 * @ORM\Column(type="string", nullable=true)
	 * @Assert\File(mimeTypes={
	 *     "image/jpeg", "image/png"
	 *	 })
	 * @Assert\Image(
	 *     minWidth = 500,
	 *     maxWidth = 500,
	 *     minHeight = 120,
	 *     maxHeight = 120
	 * )
	 */
	private $logo;


    public function __construct()
    {
        $this->applications = new ArrayCollection();
    }


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }


    /**
     * @return string|null
     */
    public function getCompanyName(): ?string
    {
        return $this->companyName;
    }


    /**
     * @param mixed $companyName
     */
    public function setCompanyName($companyName): void
    {
        $this->companyName = $companyName;
    }


    /**
     * @return mixed
     */
    public function getContactPerson()
    {
        return $this->contactPerson;
    }


    /**
     * @param mixed $contactPerson
     */
    public function setContactPerson($contactPerson): void
    {
        $this->contactPerson = $contactPerson;
    }


    /**
     * @return mixed
     */
    public function getPhoneNumber()
    {
        return $this->phoneNumber;
    }


    /**
     * @param mixed $phoneNumber
     */
    public function setPhoneNumber($phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }


    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }


    /**
     * @param mixed $email
     */
    public function setEmail($email): void
    {
        $this->email = $email;
    }


	/**
	 * @return mixed
	 */
	public function getPrimaryColor()
	{
		return $this->primaryColor;
	}


	/**
	 * @param mixed $primaryColor
	 */
	public function setPrimaryColor($primaryColor): void
	{
		$this->primaryColor = $primaryColor;
	}


	/**
	 * @return mixed
	 */
	public function getSecondaryColor()
	{
		return $this->secondaryColor;
	}


	/**
	 * @param mixed $secondaryColor
	 */
	public function setSecondaryColor($secondaryColor): void
	{
		$this->secondaryColor = $secondaryColor;
	}


	/**
	 * @return mixed
	 */
	public function getSidebarColor()
	{
		return $this->sidebarColor;
	}

	
	/**
	 * @param mixed $sidebarColor
	 */
	public function setSidebarColor($sidebarColor): void
	{
		$this->sidebarColor = $sidebarColor;
	}


	/**
	 * @return mixed
	 */
	public function getLogo()
	{
		return $this->logo;
	}


	/**
	 * @param mixed $logo
	 */
	public function setLogo($logo): void
	{
		$this->logo = $logo;
	}


	/**
	 * @return mixed
	 */
	public function getApplications()
	{
		return $this->applications;
	}
}