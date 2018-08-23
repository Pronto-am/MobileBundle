<?php

namespace Pronto\MobileBundle\Twig;


use Exception;
use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig_Function;

class AssetVersioning extends AbstractExtension
{
	/** @var array $manifest */
	private $manifest;


	/**
	 * AssetVersioning constructor.
	 * @param KernelInterface $kernel
	 */
	public function __construct(KernelInterface $kernel)
	{
		// Try to parse the mix manifest
		try {
			$fileLocation = $kernel->getProjectDir() . '/public/bundles/prontomobile/mix-manifest.json';

			$this->manifest = json_decode(file_get_contents($fileLocation), true);
		} catch (Exception $exception) {
			$this->manifest = [];
		}
	}


	/**
	 * @return array|Twig_Function[]
	 */
	public function getFunctions(): array
	{
		return [
			new TwigFunction('mix', [$this, 'getFile'])
		];
	}


	/**
	 * Get the versioned filename
	 *
	 * @param $fileName
	 * @return string
	 */
	public function getFile($fileName): string
	{
		return '/bundles/prontomobile' . ($this->manifest[$fileName] ?? $fileName);
	}
}