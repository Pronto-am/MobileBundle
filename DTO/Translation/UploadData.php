<?php

namespace Pronto\MobileBundle\DTO\Translation;


use Symfony\Component\Validator\Constraints as Assert;

class UploadData
{
	/**
	 * @Assert\NotBlank(message="A file of type json or xml should be provided")
	 * @Assert\File(mimeTypes={"text/plain", "text/xml", "application/json", "application/xml"})
	 */
	public $file;
}