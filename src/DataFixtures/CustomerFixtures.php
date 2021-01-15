<?php

namespace Pronto\MobileBundle\DataFixtures;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Pronto\MobileBundle\Entity\Customer;

class CustomerFixtures extends Fixture implements DependentFixtureInterface
{
	public const CUSTOMER = 'customer';

	/**
	 * Load data fixtures with the passed EntityManager
	 *
	 * @param ObjectManager $manager
	 */
	public function load(ObjectManager $manager): void
	{
		$customer = new Customer();
		$customer->setEmail('admin@example.com');
		$customer->setCompanyName('Company name');
		$customer->setContactPerson('John Doe');
		$customer->setPhoneNumber('');
		$customer->setPrimaryColor('2a9d8f');
		$customer->setSecondaryColor('ffa801');
		$customer->setSidebarColor('40474f');

		$manager->persist($customer);
		$manager->flush();

		$this->addReference(self::CUSTOMER, $customer);
	}


	/**
	 * We need to initialize the plugins first, so the config is being copied over to the customer
	 *
	 * @return array
	 */
	public function getDependencies()
	{
		return array(
			PluginFixtures::class,
		);
	}
}