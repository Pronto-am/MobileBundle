<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;


use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileProperty extends BaseType
{

	/**
	 * Parse the form data as entry value
	 *
	 * @return array
	 */
	public function parse(): array
	{
		// Set the upload directory
		$directory = 'uploads/collections/' . $this->property->getCollection()->getIdentifier();

		$parsed = [];

		$files = $this->fileBag->all();

		// Loop through all of the uploaded files
		foreach ($files[$this->getIdentifier()] as $key => $file) {
			if ($file instanceof UploadedFile) {
				$fileName = $this->uploadFile($directory, $file);

				$parsed[] = $fileName;
			}
		}

		// Get the already uploaded files, so they aren't lost
		foreach ($this->fields as $field => $value) {
			if($uploaded = json_decode($value)) {
				$parsed = array_merge($parsed, $uploaded);
			}
		}

		return [
			$this->getIdentifier() => $parsed
		];
	}


	/**
	 * Upload the file
	 *
	 * @param $directory
	 * @param UploadedFile $file
	 * @return string
	 */
	private function uploadFile($directory, UploadedFile $file): string
	{
		$fileName = md5(uniqid('', true)) . '.' . $file->guessExtension();

		$file->move($directory, $fileName);

		return $fileName;
	}
}