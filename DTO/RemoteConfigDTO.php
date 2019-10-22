<?php

namespace Pronto\MobileBundle\DTO;

use DateTime;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class RemoteConfigDTO
 * @package Pronto\MobileBundle\Request
 */
class RemoteConfigDTO extends BaseDTO
{
    /**
     * @var int $id
     */
    public $id;

    /**
     * @Assert\NotBlank()
     * @var string $name
     */
    public $name;

    /**
     * @Assert\NotBlank()
     * @var string $identifier
     */
    public $identifier;

    /**
     * @var string $description
     */
    public $description;

    /**
     * @Assert\NotBlank()
     * @var string $type
     */
    public $type;

    /**
     * @var string $value
     */
    public $value;

    /**
     * @var array $jsonValue
     */
    public $jsonValue;

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
        return ['name', 'identifier', 'description', 'type', 'value', 'jsonValue', 'releaseDate', 'android' => 'isAndroid', 'ios' => 'isIos'];
    }

    /**
     * @return RemoteConfigType|null
     */
    public function getType(): ?RemoteConfigType
    {
        return $this->type ? new RemoteConfigType($this->type) : null;
    }
}
