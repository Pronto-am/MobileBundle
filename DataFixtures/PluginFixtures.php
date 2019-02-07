<?php

namespace Pronto\MobileBundle\DataFixtures;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Pronto\MobileBundle\Entity\Plugin;

class PluginFixtures extends Fixture
{

	/**
	 * Load data fixtures with the passed EntityManager
	 *
	 * @param ObjectManager $manager
	 */
	public function load(ObjectManager $manager): void
	{
		$collections = new Plugin();
		$collections->setName('Collections');
		$collections->setIdentifier('collections');
		$collections->setIcon('fa-copy');
		$collections->setDefaultConfig([]);

		$manager->persist($collections);

		$appUsers = new Plugin();
		$appUsers->setName('App users');
		$appUsers->setIdentifier('appUsers');
		$appUsers->setIcon('fa-mobile fa-lg');
		$appUsers->setDefaultConfig([
			'registrationEnabled'       => [
				'type' => 'checkbox'
			],
			'accountActivationViaEmail' => [
				'type' => 'checkbox'
			]
		]);

		$manager->persist($appUsers);

		$pushNotifications = new Plugin();
		$pushNotifications->setName('Push notifications');
		$pushNotifications->setIdentifier('notifications');
		$pushNotifications->setIcon('fa-bell');
		$pushNotifications->setDefaultConfig([
			'firebaseAccessToken'      => [
				'type'  => 'text',
				'value' => ''
			],
			'notificationHtmlTemplate' => [
				'type'  => 'code',
				'value' => '<html><head><style type="text/css"></style></head><body></body></html>'
			]
		]);

		$manager->persist($pushNotifications);

		$translations = new Plugin();
		$translations->setName('Translations');
		$translations->setIdentifier('translations');
		$translations->setIcon('fa-language');
		$translations->setDefaultConfig([]);

		$manager->persist($translations);

		$translations = new Plugin();
		$translations->setName('App versions');
		$translations->setIdentifier('app_versions');
		$translations->setIcon('fa-code-fork');
		$translations->setDefaultConfig([]);

		$manager->persist($translations);
		$manager->flush();
	}
}