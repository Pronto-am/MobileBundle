<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Application;

use Doctrine\Common\Collections\Collection as DoctrineCollection;
use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Application;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: 'application_versions')]
#[ORM\Entity(repositoryClass: 'Pronto\MobileBundle\Repository\Application\VersionRepository')]
class Version
{

    public const SESSION_IDENTIFIER = '_pronto.applicationVersion';

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Application', inversedBy: 'applicationVersions')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private $application;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private $name;

    #[ORM\OneToMany(targetEntity: 'Pronto\MobileBundle\Entity\Collection', mappedBy: 'applicationVersion')]
    private $collections;

    /**
     * @return int|null
     */
    public function getId(): ?int
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
     * @param Application $application
     */
    public function setApplication(Application $application): void
    {
        $this->application = $application;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return DoctrineCollection
     */
    public function getCollections(): DoctrineCollection
    {
        return $this->collections;
    }
}
