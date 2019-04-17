<?php

namespace Pronto\MobileBundle\Service\PushNotification;


use Kreait\Firebase\ServiceAccount;
use Symfony\Component\HttpKernel\Config\FileLocator;

class GoogleServiceAccountLoader
{
	/**
     * @var FileLocator $fileLocator
     */
	private $fileLocator;

	/**
	 * GoogleServiceAccountLoader constructor.
	 * @param FileLocator $fileLocator
	 */
	public function __construct(FileLocator $fileLocator)
	{
		$this->fileLocator = $fileLocator;
	}

	/**
	 * @return ServiceAccount
	 */
	public function fromFile(): ServiceAccount
	{
		$file = $this->fileLocator->locate('../google-service-account.json');

		return ServiceAccount::fromJsonFile($file);
	}
}
