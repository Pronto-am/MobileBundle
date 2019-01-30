<?php

namespace Pronto\MobileBundle\Controller;

use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Service\ProntoMobile;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\TranslatorInterface;

class BaseController extends Controller
{
	/**
	 * @var ProntoMobile $prontoMobile
	 */
	private $prontoMobile;

	/**
	 * @var TranslatorInterface $translator
	 */
	private $translator;

	/**
	 * BaseController constructor.
	 * @param TranslatorInterface $translator
	 * @param ProntoMobile $prontoMobile
	 */
	public function __construct(TranslatorInterface $translator, ProntoMobile $prontoMobile)
	{
		$this->prontoMobile = $prontoMobile;
		$this->translator = $translator;
	}

	/**
	 * Add the data saved flash
	 */
	public function addDataSavedFlash(): void
	{
		$this->addFlashWithMessage($this->translator->trans('alert.success.data_saved'));
	}


	/**
	 * Add the data removed flash
	 */
	public function addDataRemovedFlash(): void
	{
		$this->addFlashWithMessage($this->translator->trans('alert.success.data_removed'));
	}


	/**
	 * Add non authorized flash
	 */
	public function addNoPermissionFlash(): void
	{
		$this->addFlashWithMessage($this->translator->trans('alert.warning.no_permission'), 'danger');
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
		return $this->prontoMobile->getCustomer();
	}


	/**
	 * Get the application version from the main pronto mobile service
	 *
	 * @return Version|null
	 */
	public function getApplicationVersion(): ?Version
	{
		return $this->prontoMobile->getApplicationVersion();
	}


	/**
	 * Get the application from the main pronto mobile service
	 *
	 * @return Application|null
	 */
	public function getApplication(): ?Application
	{
		return $this->prontoMobile->getApplication();
	}
}