<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
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
     * @Groups({"Application", "Customer"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Application", "Customer"})
     */
    private $companyName;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Customer"})
     */
    private $contactPerson;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Customer"})
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Customer"})
	 */
    private $email;

	/**
	 * @ORM\Column(type="string")
     * @Groups({"Application", "Customer"})
	 */
    private $primaryColor;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Application", "Customer"})
     */
    private $primaryColorDark;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Application", "Customer"})
     */
    private $linkColor;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Application", "Customer"})
     */
    private $linkColorDark;

    /**
     * @ORM\Column(type="string")
     * @Groups({"Application", "Customer"})
     */
    private $contrastColor;

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
     * @Groups({"Application", "Customer"})
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
     * @return int|null
     */
    public function getId(): ?int
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
     * @return mixed
     */
    public function getPrimaryColorDark()
    {
        return $this->primaryColorDark;
    }

    /**
     * @param mixed $primaryColorDark
     * @return Customer
     */
    public function setPrimaryColorDark($primaryColorDark)
    {
        $this->primaryColorDark = $primaryColorDark;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLinkColor()
    {
        return $this->linkColor;
    }

    /**
     * @param mixed $linkColor
     * @return Customer
     */
    public function setLinkColor($linkColor)
    {
        $this->linkColor = $linkColor;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLinkColorDark()
    {
        return $this->linkColorDark;
    }

    /**
     * @param mixed $linkColorDark
     * @return Customer
     */
    public function setLinkColorDark($linkColorDark)
    {
        $this->linkColorDark = $linkColorDark;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContrastColor()
    {
        return $this->contrastColor;
    }

    /**
     * @param mixed $contrastColor
     * @return Customer
     */
    public function setContrastColor($contrastColor)
    {
        $this->contrastColor = $contrastColor;
        return $this;
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
