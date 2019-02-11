<?php

namespace Pronto\MobileBundle\Service;

use Exception;
use Pronto\MobileBundle\Utils\Str;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileManager
{
	/**
	 * @var string $uploadsDir
	 */
	private $uploadsDir;

	/**
	 * @var Filesystem $fileSystem
	 */
	private $fileSystem;

	/**
	 * FileManager constructor.
	 * @param ProntoMobile $prontoMobile
	 * @param Filesystem $filesystem
	 */
	public function __construct(ProntoMobile $prontoMobile, Filesystem $filesystem)
	{
		$this->fileSystem = $filesystem;
		$this->uploadsDir = $prontoMobile->getConfiguration('uploads_folder', 'uploads');
	}

	/**
	 * @param string $file
	 * @return null|File
	 */
	public function get(string $file): ?File
	{
		try {
			return new File(Str::concatDirectories($this->uploadsDir, $file));
		} catch (FileNotFoundException $exception) {
			return null;
		}
	}

	/**
	 * Upload the file
	 *
	 * @param string $directory
	 * @param UploadedFile $file
	 * @return string
	 */
	public function upload(string $directory, UploadedFile $file): string
	{
		$fileName = md5(uniqid('', true)) . '.' . $file->guessExtension();
		$file->move(Str::concatDirectories($this->uploadsDir, $directory), $fileName);

		return $fileName;
	}

	/**
	 * @param string $fileName
	 * @return bool
	 */
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