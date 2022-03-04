<?php

namespace Pronto\MobileBundle\Service;

use Exception;
use Pronto\MobileBundle\Utils\Str;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileManager
{
    public const APP_VERSIONS_DIRECTORY = '/customers/app_versions';
    public const IMAGES_DIRECTORY = '/customers/images';

    private string $uploadsDir;
    private Filesystem $fileSystem;

    public function __construct(ContainerInterface $container, Filesystem $filesystem)
    {
        $this->fileSystem = $filesystem;
        $this->uploadsDir = $container->get(ProntoMobile::class)->getConfiguration('uploads_folder', 'uploads');
    }

    public function get(string $file): ?File
    {
        try {
            return new File(Str::concatDirectories($this->uploadsDir, $file));
        } catch (FileNotFoundException $exception) {
            return null;
        }
    }

    public function upload(string $directory, UploadedFile $file): string
    {
        $fileName = md5(uniqid('', true)) . '.' . $file->guessExtension();
        $file->move(Str::concatDirectories($this->uploadsDir, $directory), $fileName);

        return $fileName;
    }

    public function remove(string $fileName): bool
    {
        try {
            $this->fileSystem->remove(Str::concatDirectories($this->uploadsDir, $fileName));
            return true;
        } catch (Exception $exception) {
            return false;
        }
    }
}
