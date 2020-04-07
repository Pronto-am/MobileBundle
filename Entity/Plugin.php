<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * Class Plugin
 * @package Pronto\MobileBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="plugins")
 */
class Plugin
{
	// Plugin names
	public const COLLECTIONS = 'collections';
	public const APP_USERS = 'app_users';
	public const APP_VERSIONS = 'app_versions';
	public const PUSH_NOTIFICATIONS = 'notifications';
	public const TRANSLATIONS = 'translations';
	public const REMOTE_CONFIG = 'remote_config';

	// Config settings
	public const PUSH_NOTIFICATIONS_FIREBASE_TOKEN = 'firebaseAccessToken';
	public const PUSH_NOTIFICATIONS_NOTIFICATION_TEMPLATE = 'notificationHtmlTemplate';
	public const APP_USERS_REGISTRATION_ENABLED = 'registrationEnabled';
	public const APP_USERS_ACTIVATION_REQUIRED = 'accountActivationViaEmail';

	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
     *
     * @Groups({"Plugin", "ApplicationPlugin"})
	 */
	private $id;

	/**
	 * @ORM\Column(type="string")
     * @Groups({"Plugin", "ApplicationPlugin"})
     */
	private $name;

	/**
	 * @ORM\Column(type="string")
     * @Groups({"Plugin", "ApplicationPlugin", "Application"})
	 */
	private $identifier;

	/**
	 * @ORM\Column(type="string")
     * @Groups({"Plugin"})
	 */
	private $icon;

	/**
	 * @ORM\Column(type="json_array")
	 */
	private $defaultConfig;

	/**
	 * @ORM\OneToMany(targetEntity="Pronto\MobileBundle\Entity\Application\ApplicationPlugin", mappedBy="plugin")
	 */
	private $applicationPlugins;

    /**
     * Plugin constructor.
     */
	public function __construct()
	{
		$this->applicationPlugins = new ArrayCollection();
	}

	/**
	 * @return int|null
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * @return string
	 */
	public function getName(): string
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
	 * @return string
	 */
	public function getIdentifier(): string
	{
		return $this->identifier;
	}

	/**
	 * @param string $identifier
	 */
	public function setIdentifier(string $identifier): void
	{
		$this->identifier = $identifier;
	}

	/**
	 * @return string
	 */
	public function getIcon(): string
	{
		return $this->icon;
	}

	/**
	 * @param string $icon
	 */
	public function setIcon(string $icon): void
	{
		$this->icon = $icon;
	}

	/**
	 * @return array
	 */
	public function getDefaultConfig(): array
	{
		return $this->defaultConfig;
	}

	/**
	 * @param array $defaultConfig
	 */
	public function setDefaultConfig(array $defaultConfig): void
	{
		$this->defaultConfig = $defaultConfig;
	}
}
