<?php

namespace Pronto\MobileBundle\Twig;


use Faker\Factory;
use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig_Function;

class MixExtension extends AbstractExtension
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
        $fileLocation = $kernel->getProjectDir() . '/public/bundles/prontomobile/mix-manifest.json';
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
            new TwigFunction('mix', [$this, 'generateAssetTags'])
        ];
    }

    /**
     * Get the versioned filename
     *
     * @param $fileName
     * @return string
     */
    public function generateAssetTags(string $fileName): string
    {
        $fileName = ltrim($fileName, '/');
        $filePath = $this->manifest['/' . $fileName] ?? $fileName . '.js';

        // Return basic tags
        if($this->isJavascriptFile($fileName)) {
            return sprintf('<script src="/bundles/prontomobile/%s" type="text/javascript"></script>', $fileName);
        } else if($this->isStyleFile($fileName)) {
            return sprintf('<link rel="stylesheet" href="/bundles/prontomobile/%s" />', $fileName);
        }
        return '';
    }

    /**
     * @param string $fileName
     * @return bool
     */
    private function isJavascriptFile(string $fileName)
    {
        return substr($fileName, 0, 2) === 'js';
    }

    /**
     * @param string $fileName
     * @return bool
     */
    private function isStyleFile(string $fileName)
    {
        return substr($fileName, 0, 3) === 'css';
    }
}
