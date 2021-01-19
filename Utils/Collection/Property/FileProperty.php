<?php

namespace Pronto\MobileBundle\Utils\Collection\Property;


use Pronto\MobileBundle\Entity\Collection\Property;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\FileBag;

class FileProperty extends BaseType
{
    /**
     * @var array $fileBag
     */
    private $fileBag;

    /**
     * @var string|null
     */
    private $uploadsDir;

    public function __construct(array $formData, Property $property, ?FileBag $fileBag = null, ?string $uploadsDir = null)
    {
        parent::__construct($formData, $property);

        $this->fileBag = $fileBag;
        $this->uploadsDir = $uploadsDir;
    }

    /**
	 * Parse the form data as entry value
	 *
	 * @return array
	 */
	public function parse(): array
	{
		// Set the upload directory
		$directory = rtrim($this->uploadsDir, '/') . '/collections/' . $this->property->getCollection()->getId();

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
