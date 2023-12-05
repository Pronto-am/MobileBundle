<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\DTO;

use DateTime;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Pronto\MobileBundle\Validator\Constraints\Config\IsUniqueIdentifier;
use Pronto\MobileBundle\Validator\Constraints\Config\IsValidForType;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class RemoteConfigDTO
 * @package Pronto\MobileBundle\Request
 */
class RemoteConfigDTO extends BaseDTO
{
    /**
     * @var int|null $id
     */
    public $id;

    /**
     * @var string $name
     */
    #[Assert\NotBlank]
    public $name;

    /**
     * @var string $identifier
     * @IsUniqueIdentifier
     */
    #[Assert\NotBlank]
    public $identifier;

    /**
     * @var string $description
     */
    public $description;

    /**
     * @var string $type
     */
    #[Assert\NotBlank]
    public $type;

    /**
     * @var array $value
     * @IsValidForType
     */
    public $value;

    /**
     * @var DateTime $releaseDate
     */
    public $releaseDate;

    /**
     * @var boolean $android
     */
    public $android = true;

    /**
     * @var boolean $ios
     */
    public $ios = true;

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return [
            'name',
            'identifier',
            'description',
            'type',
            'releaseDate',
            'android' => 'isAndroid',
            'ios'     => 'isIos'
        ];
    }

    /**
     * @return RemoteConfigType|null
     */
    public function getType(): ?RemoteConfigType
    {
        return $this->type ? new RemoteConfigType($this->type) : null;
    }
}
