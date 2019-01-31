<?php

namespace Pronto\MobileBundle\Service;

use InvalidArgumentException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
	/** @var string $targetDirectory */
	private $targetDirectory;


	/**
	 * Set the target directory of the file
	 *
	 * @param $targetDirectory
	 */
	public function setTargetDirectory(string $targetDirectory): void
	{
		$this->targetDirectory = $targetDirectory;
	}


	/**
	 * Upload the file
	 *
	 * @param UploadedFile $file
	 * @return string
	 * @throws \InvalidArgumentException
	 */
	public function upload(UploadedFile $file): string
	{
		if($this->getTargetDirectory() === null) {
			throw new InvalidArgumentException('The file upload directory is not set');
		}

		$fileName = md5(uniqid('', true)).'.'.$file->guessExtension();

		$file->move($this->getTargetDirectory(), $fileName);

		return $fileName;
	}


	/**
	 * Get the target directory
	 *
	 * @return mixed
	 */
	public function getTargetDirectory(): string
	{
		return $this->targetDirectory;
	}
}