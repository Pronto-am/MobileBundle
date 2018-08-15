<?php

namespace Pronto\MobileBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;


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
	public const PUSH_NOTIFICATIONS = 'notifications';

	// Config settings
	public const PUSH_NOTIFICATIONS_FIREBASE_TOKEN = 'firebaseAccessToken';
	public const PUSH_NOTIFICATIONS_NOTIFICATION_TEMPLATE = 'notificationHtmlTemplate';
	public const APP_USERS_REGISTRATION_ENABLED = 'registrationEnabled';
	public const APP_USERS_ACTIVATION_REQUIRED = 'accountActivationViaEmail';


	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 * @ORM\Column(type="integer")
	 */
	private $id;


	/**
	 * @ORM\Column(type="string")
	 */
	private $name;


	/**
	 * @ORM\Column(type="string")
	 */
	private $identifier;


	/**
	 * @ORM\Column(type="string")
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


	public function __construct()
	{
		$this->applicationPlugins = new ArrayCollection();
	}


	/**
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
	}


	/**
	 * @return mixed
	 */
	public function getName()
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
	public function getIdentifier()
	{
		return $this->identifier;
	}


	/**
	 * @param mixed $identifier
	 */
	public function setIdentifier($identifier): void
	{
		$this->identifier = $identifier;
	}


	/**
	 * @return mixed
	 */
	public function getIcon()
	{
		return $this->icon;
	}


	/**
	 * @param mixed $icon
	 */
	public function setIcon($icon): void
	{
		$this->icon = $icon;
	}


	/**
	 * @return mixed
	 */
	public function getDefaultConfig()
	{
		return $this->defaultConfig;
	}


	/**
	 * @param mixed $defaultConfig
	 */
	public function setDefaultConfig($defaultConfig): void
	{
		$this->defaultConfig = $defaultConfig;
	}
}