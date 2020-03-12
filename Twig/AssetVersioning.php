<?php

namespace Pronto\MobileBundle\Twig;


use Faker\Factory;
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
        $fileLocation = $kernel->getProjectDir() . '/public/bundles/prontomobile/build/entrypoints.json';
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
            new TwigFunction('webpack_asset_tags', [$this, 'generateAssetTags'])
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

        // Return basic tags
        if ($this->manifest['entrypoints'][$fileName] === null) {
            if($this->isJavascriptFile($fileName)) {
                return sprintf('<script src="/build/%s.js" type="text/javascript"></script>', $fileName);
            } else if($this->isStyleFile($fileName)) {
                return sprintf('<link rel="stylesheet" href="/build/%s.css" />', $fileName);
            }
            return '';
        }

        $tags = [];

        foreach($this->manifest['entrypoints'][$fileName] as $type => $files) {
            if($this->isJavascriptFile($type)) {
                foreach($files as $file) {
                    $tags[] = sprintf('<script src="/%s" type="text/javascript"></script>', ltrim($file, '/'));
                }
            } else if($this->isStyleFile($type)) {
                foreach($files as $file) {
                    $tags[] = sprintf('<link rel="stylesheet" href="/%s" />', ltrim($file, '/'));
                }
            }
        }

        return implode('', $tags);
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
