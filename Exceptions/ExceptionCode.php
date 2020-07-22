<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Exceptions;

class ExceptionCode
{
    /** @var array $codes */
    private static $codes = [
        Auth\InvalidAuthorizationHeaderException::class     => 401,
        Auth\InvalidAuthorizationTokenException::class      => 401,
        Auth\InvalidPluginStateException::class             => 403,
        Auth\NotAuthorizedException::class                  => 403,
        // General
        EntityNotFoundException::class                      => 4004,
        // Segments
        PushNotifications\Segments\NotFoundException::class => 1004,
        // App users
        AppUsers\UserAlreadyRegisteredException::class      => 1101,
        AppUsers\UserNotActivatedException::class           => 1102,
        AppUsers\EmailAlreadyExistsException::class         => 1103,
        AppUsers\NotFoundException::class                   => 1104,
        // Collections
        Collections\NotFoundException::class                => 1204,
        // Collection entries
        Collections\Entries\NotFoundException::class        => 1304,
        // Translations
        TranslationKeys\ZipFileNotCreatedException::class   => 1401,
        TranslationKeys\NotFoundException::class            => 1404,
        // App versions
        AppVersions\FileNotFoundException::class            => 1501,
        AppVersions\NotFoundException::class                => 1504,
        // Devices
        Devices\AlreadyRegisteredException::class           => 1622,
        Devices\MissingTokenException::class                => 1623,
        Devices\NotFoundException::class                    => 1604,
        // Push notifications
        PushNotifications\NotFoundException::class          => 1704,
        PushNotifications\InvalidSegmentException::class    => 1722,
        // Applications
        Applications\OneVersionRequiredException::class     => 1801,
    ];

    public static function for(string $exception): int
    {
        return self::$codes[$exception];
    }
}
