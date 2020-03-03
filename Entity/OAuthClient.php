<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\Client as BaseClient;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * Class Application
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="oauth_clients")
 * @ORM\HasLifecycleCallbacks
 */
class OAuthClient extends BaseClient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @Groups({"Application"})
     */
    protected $id;

    /**
     * @var string $randomId
     * @Groups({"Application"})
     */
    protected $randomId;

    /**
     * @var string $secret
     * @Groups({"Application"})
     */
    protected $secret;

    /**
     * @ORM\ManyToOne(targetEntity="Pronto\MobileBundle\Entity\Application")
     * @ORM\JoinColumn(nullable=true, onDelete="CASCADE")
     */
    private $application;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getApplication()
    {
        return $this->application;
    }

    /**
     * @param Application|null $application
     */
    public function setApplication(?Application $application): void
    {
        $this->application = $application;
    }
}
