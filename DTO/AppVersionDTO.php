<?php

namespace Pronto\MobileBundle\DTO;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use /** @noinspection PhpUnusedAliasInspection */
    Symfony\Component\Validator\Constraints as Assert;
use /** @noinspection PhpUnusedAliasInspection */
    Pronto\MobileBundle\Validator\Constraints\AppVersion\IsSemanticVersion;

/**
 * Class AppVersionDTO
 * @package Pronto\MobileBundle\DTO
 */
class AppVersionDTO extends BaseDTO
{
    /**
     * @var string $version
     * @Assert\NotBlank()
     * @IsSemanticVersion
     */
    public $version;

    /**
     * @var string $platform
     * @Assert\NotBlank()
     */
    public $platform;

    /**
     * @var string $releaseDate
     * @Assert\NotBlank()
     */
    public $releaseDate;

    /**
     * @var bool $required
     */
    public $required = false;

    /**
     * @var string $description
     * @Assert\Type(type="array")
     * @Assert\All(constraints={@Assert\NotBlank()})
     */
    public $description;

    /**
     * @var string $url
     */
    public $url;

    /**
     * @var null|File $file
     */
    public $file;

    /**
     * @Assert\Callback
     * @param ExecutionContextInterface $context
     */
    public function validate(ExecutionContextInterface $context)
    {
        if ($this->url === null && $this->file === null) {
            $context->buildViolation('Een bestand of url dient aangeleverd te worden.')->atPath('url')->addViolation();
        }
    }

    /**
     * @return array
     */
    public static function getFillable(): array
    {
        return [
            'version',
            'platform',
            'releaseDate',
            'required' => 'isRequired',
            'description',
            'url'
        ];
    }
}