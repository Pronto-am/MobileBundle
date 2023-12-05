<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: 'customers')]
#[ORM\Entity]
class Customer
{
    public const SESSION_IDENTIFIER = '_pronto.customer';

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $companyName;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $contactPerson;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $phoneNumber;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $email;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $primaryColor;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $secondaryColor;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $sidebarColor;

    #[ORM\OneToMany(targetEntity: 'Pronto\MobileBundle\Entity\Application', mappedBy: 'customer')]
    private $applications;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Assert\File(mimeTypes: ['image/jpeg', 'image/png'])]
    #[Assert\Image(minWidth: 500, maxWidth: 500, minHeight: 120, maxHeight: 120)]
    private $logo;

    public function __construct()
    {
        $this->applications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCompanyName(): ?string
    {
        return $this->companyName;
    }

    public function setCompanyName(string $companyName): void
    {
        $this->companyName = $companyName;
    }

    public function getContactPerson(): string
    {
        return $this->contactPerson;
    }

    public function setContactPerson(string $contactPerson): void
    {
        $this->contactPerson = $contactPerson;
    }

    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPrimaryColor(): string
    {
        return $this->primaryColor;
    }

    public function setPrimaryColor(string $primaryColor): void
    {
        $this->primaryColor = $primaryColor;
    }

    public function getSecondaryColor(): string
    {
        return $this->secondaryColor;
    }

    public function setSecondaryColor(string $secondaryColor): void
    {
        $this->secondaryColor = $secondaryColor;
    }

    public function getSidebarColor(): string
    {
        return $this->sidebarColor;
    }

    public function setSidebarColor(string $sidebarColor): void
    {
        $this->sidebarColor = $sidebarColor;
    }

    public function getLogo(): string | UploadedFile | null
    {
        return $this->logo;
    }

    public function setLogo(string | UploadedFile | null $logo): void
    {
        $this->logo = $logo;
    }

    public function getApplications(): DoctrineCollection
    {
        return $this->applications;
    }
}
