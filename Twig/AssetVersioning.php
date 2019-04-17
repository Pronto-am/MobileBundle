<?php

namespace Pronto\MobileBundle\Twig;


use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig_Function;

class AssetVersioning extends AbstractExtension
{
    /**
     * @var array $manifest
     */
    private $manifest = [];

    /**
     * AssetVersioning constructor.
     * @param KernelInterface $kernel
     */
    public function __construct(KernelInterface $kernel)
    {
        // Try to parse the mix manifest
        $fileLocation = $kernel->getRootDir() . '/../public/bundles/prontomobile/mix-manifest.json';
        $manifest = @file_get_contents($fileLocation);

        if ($manifest !== false) {
            $this->manifest = json_decode($manifest, true);
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
    public function getFile(string $fileName): string
    {
        return '/bundles/prontomobile' . ($this->manifest[$fileName] ?? $fileName);
    }
}
