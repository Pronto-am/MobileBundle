<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Application;

use League\Bundle\OAuth2ServerBundle\Model\Client;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\HasUuid;
use Ramsey\Uuid\Uuid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: 'application_clients')]
#[ORM\Entity]
class ApplicationClient
{
    use HasUuid;

    #[ORM\ManyToOne(targetEntity: 'Pronto\MobileBundle\Entity\Application', inversedBy: 'applicationClients')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private Application $application;

    #[ORM\Column(type: 'string')]
    private string $clientIdentifier;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank]
    private string $name;

    public function __construct(Application $application, Client $client, string $name)
    {
        $this->id = Uuid::uuid4()->toString();
        $this->application = $application;
        $this->clientIdentifier = $client->getIdentifier();
        $this->name = $name;
    }

    public function getApplication(): Application
    {
        return $this->application;
    }

    public function setApplication(Application $application): void
    {
        $this->application = $application;
    }

    public function getClientIdentifier(): string
    {
        return $this->clientIdentifier;
    }

    public function setClientIdentifier(string $clientIdentifier): ApplicationClient
    {
        $this->clientIdentifier = $clientIdentifier;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }
}
