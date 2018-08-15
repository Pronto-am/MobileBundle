<?php

namespace Pronto\MobileBundle\Controller;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Customer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Translation\Translator;

class BaseController extends Controller
{
	/**
	 * Add the data saved flash
	 */
	public function addDataSavedFlash(): void
	{
		/** @var Translator $translator */
		$translator = $this->get('translator');

		$this->addFlashWithMessage($translator->trans('alert.success.data_saved'));
	}


	/**
	 * Add the data removed flash
	 */
	public function addDataRemovedFlash(): void
	{
		/** @var Translator $translator */
		$translator = $this->get('translator');

		$this->addFlashWithMessage($translator->trans('alert.success.data_removed'));
	}


	/**
	 * Add non authorized flash
	 */
	public function addNoPermissionFlash(): void
	{
		/** @var Translator $translator */
		$translator = $this->get('translator');

		$this->addFlashWithMessage($translator->trans('alert.warning.no_permission'), 'danger');
	}


	/**
	 * Create a flash from a message provided string
	 *
	 * @param $message
	 * @param string $type
	 */
	private function addFlashWithMessage($message, $type = 'success'): void
	{
		$this->addFlash(
			$type,
			sprintf($message)
		);
	}


	/**
	 * Get the customer from the main pronto mobile service
	 *
	 * @return Customer|null
	 */
	public function getCustomer(): ?Customer
	{
		return $this->get('pronto_mobile.global.app')->getCustomer();
	}


	/**
	 * Get the application version from the main pronto mobile service
	 *
	 * @return Version|null
	 */
	public function getApplicationVersion(): ?Version
	{
		return $this->get('pronto_mobile.global.app')->getApplicationVersion();
	}


	/**
	 * Get the application from the main pronto mobile service
	 *
	 * @return Application|null
	 */
	public function getApplication(): ?Application
	{
		return $this->get('pronto_mobile.global.app')->getApplication();
	}
}