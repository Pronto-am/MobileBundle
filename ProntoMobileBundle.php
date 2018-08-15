<?php

namespace Pronto\MobileBundle;

use Pronto\MobileBundle\DependencyInjection\ProntoMobileExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class ProntoMobileBundle extends Bundle
{
	/**
	 * @return null|ProntoMobileExtension|\Symfony\Component\DependencyInjection\Extension\ExtensionInterface
	 */
	public function getContainerExtension()
	{
		return new ProntoMobileExtension();
	}
}
