<?php

namespace Pronto\MobileBundle\Twig;

use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AssetVersioning extends AbstractExtension
{
    private array $manifest = [];

    public function __construct(KernelInterface $kernel)
    {
        // Try to parse the mix manifest
        $fileLocation = $kernel->getProjectDir() . '/public/bundles/prontomobile/mix-manifest.json';
        $manifest = @file_get_contents($fileLocation);

        if ($manifest !== false) {
            $this->manifest = json_decode($manifest, true);
        }
    }

    /**
     * @return array|TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('mix', [$this, 'getFile'])
        ];
    }

    public function getFile(string $fileName): string
    {
        return '/bundles/prontomobile' . ($this->manifest[$fileName] ?? $fileName);
    }
}
