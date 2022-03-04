<?php

namespace Pronto\MobileBundle\Utils;

class Str
{
    public static function toCamelCase(string $string, string $delimiter = '_', bool $lowerCaseFirst = true): string
    {
        $string = str_replace('_', '', ucwords($string, $delimiter));

        if ($lowerCaseFirst) {
            $string = lcfirst($string);
        }

        return $string;
    }

    public static function concatDirectories(string $directory, string $file): string
    {
        return $directory . '/' . self::removeSlashes($file);
    }

    public static function removeSlashes(string $string, bool $left = true, bool $right = false): string
    {
        if ($left) {
            $string = ltrim($string, '/');
        }

        if ($right) {
            $string = rtrim($string, '/');
        }

        return $string;
    }
}
