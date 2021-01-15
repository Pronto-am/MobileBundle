<?php

namespace Pronto\MobileBundle;

use Pronto\MobileBundle\DependencyInjection\ProntoMobileExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class ProntoMobileBundle extends Bundle
{
	/**
	 * @return null|ProntoMobileExtension|ExtensionInterface
	 */
	public function getContainerExtension()
	{
		return new ProntoMobileExtension();
	}
}
