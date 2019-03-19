<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
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

	/**
	 * Customer constructor.
	 */
    public function __construct()
    {
        $this->applications = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId(): int
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
     * @param string $companyName
     */
    public function setCompanyName(string $companyName): void
    {
        $this->companyName = $companyName;
    }

    /**
     * @return string
     */
    public function getContactPerson(): string
    {
        return $this->contactPerson;
    }

    /**
     * @param string $contactPerson
     */
    public function setContactPerson(string $contactPerson): void
	{
		$this->contactPerson = $contactPerson;
	}

    /**
     * @return string
     */
    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    /**
     * @param string $phoneNumber
     */
    public function setPhoneNumber(string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

	/**
	 * @return string
	 */
	public function getPrimaryColor(): string
	{
		return $this->primaryColor;
	}


	/**
	 * @param string $primaryColor
	 */
	public function setPrimaryColor(string $primaryColor): void
	{
		$this->primaryColor = $primaryColor;
	}

	/**
	 * @return string
	 */
	public function getSecondaryColor(): string
	{
		return $this->secondaryColor;
	}

	/**
	 * @param string $secondaryColor
	 */
	public function setSecondaryColor(string $secondaryColor): void
	{
		$this->secondaryColor = $secondaryColor;
	}

	/**
	 * @return string
	 */
	public function getSidebarColor(): string
	{
		return $this->sidebarColor;
	}
	
	/**
	 * @param string $sidebarColor
	 */
	public function setSidebarColor(string $sidebarColor): void
	{
		$this->sidebarColor = $sidebarColor;
	}

	/**
	 * @return string|null
	 */
	public function getLogo(): ?string
	{
		return $this->logo;
	}

	/**
	 * @param null|string $logo
	 */
	public function setLogo(?string $logo): void
	{
		$this->logo = $logo;
	}

	/**
	 * @return DoctrineCollection
	 */
	public function getApplications(): DoctrineCollection
	{
		return $this->applications;
	}
}