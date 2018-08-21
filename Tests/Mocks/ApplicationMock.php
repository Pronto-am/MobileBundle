<?php

namespace Pronto\MobileBundle\Tests\Mocks;


use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Customer;

class ApplicationMock
{
	/** @var Customer $customer */
	private $customer;

	/** @var Application $application */
	private $application;

	/** @var Application\Version $applicationVersion */
	private $applicationVersion;

	/** @var Collection $collection */
	private $collection;


	/**
	 * ApplicationMock constructor.
	 */
	public function __construct()
	{
		$this->customer = new Customer();

		$this->application = new Application();
		$this->application->setCustomer($this->customer);

		$this->applicationVersion = new Application\Version();
		$this->applicationVersion->setApplication($this->application);

		$this->collection = new Collection();
		$this->collection->setApplicationVersion($this->applicationVersion);
		$this->collection->setIdentifier('locations');
	}


	/**
	 * @return Customer
	 */
	public function getCustomer(): Customer
	{
		return $this->customer;
	}


	/**
	 * @return Application
	 */
	public function getApplication(): Application
	{
		return $this->application;
	}


	/**
	 * @return Application\Version
	 */
	public function getApplicationVersion(): Application\Version
	{
		return $this->applicationVersion;
	}


	/**
	 * @return Collection
	 */
	public function getCollection(): Collection
	{
		return $this->collection;
	}


	/**
	 * @param string $identifier
	 * @param bool $translatable
	 * @return Collection\Property\Type
	 */
	public function getCollectionPropertyType(string $identifier, bool $translatable = false): Collection\Property\Type
	{
		$type = new Collection\Property\Type();
		$type->setType($identifier);
		$type->setTranslatable($translatable);
		$type->setOrdering(1);
		$type->setJsonListviewCompatible(true);

		return $type;
	}
}