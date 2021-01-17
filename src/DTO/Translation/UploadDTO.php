<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO\Translation;

use Pronto\MobileBundle\Validator\Constraints\Translation\Upload\BlankForFileType;
use Symfony\Component\Validator\Constraints as Assert;

class UploadDTO
{
    /**
     * @Assert\NotBlank(message="A file of type .json, .xml, .csv or .strings should be provided")
     */
    public $file;

    /**
     * @var string $type
     * @BlankForFileType(extension="csv")
     */
    public $type;

    /**
     * @var string $type
     * @BlankForFileType(extension="csv")
     */
    public $language;

    /**
     * @var boolean $android
     */
    public $android;

    /**
     * @var boolean $ios
     */
    public $ios;
}
