<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Entity\Application;

use Doctrine\ORM\Mapping as ORM;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\HasUuid;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;
use Trikoder\Bundle\OAuth2Bundle\Model\Client;

/**
 * @ORM\Entity()
 * @ORM\Table(name="application_clients")
 */
class ApplicationClient
{
    use HasUuid;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application", inversedBy="applicationClients")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     */
    private $application;

    /**
     * @ORM\ManyToOne(targetEntity="Trikoder\Bundle\OAuth2Bundle\Model\Client")
     * @ORM\JoinColumn(nullable=false, referencedColumnName="identifier", onDelete="CASCADE")
     */
    private $client;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    private $name;

    public function __construct(Application $application, Client $client, string $name)
    {
        $this->id = Uuid::uuid4()->toString();
        $this->application = $application;
        $this->client = $client;
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

    public function getClient(): Client
    {
        return $this->client;
    }

    public function setClient(Client $client): ApplicationClient
    {
        $this->client = $client;
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
