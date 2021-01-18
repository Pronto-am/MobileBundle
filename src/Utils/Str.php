<?php

namespace Pronto\MobileBundle\Utils;

class Str
{
    /**
     * Sort an array alphabetically
     *
     * @param string $string
     * @param string $delimiter
     * @param bool $lowerCaseFirst
     * @return string
     */
    public static function toCamelCase(string $string, string $delimiter = '_', bool $lowerCaseFirst = true): string
    {
        $string = str_replace('_', '', ucwords($string, $delimiter));

        if ($lowerCaseFirst) {
            $string = lcfirst($string);
        }

        return $string;
    }

    /**
     * @param string $directory
     * @param string $file
     * @return string
     */
    public static function concatDirectories(string $directory, string $file): string
    {
        return $directory . '/' . self::removeSlashes($file);
    }

    /**
     * Remove the slashes from a string
     *
     * @param string $string
     * @param bool $left
     * @param bool $right
     * @return string
     */
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
