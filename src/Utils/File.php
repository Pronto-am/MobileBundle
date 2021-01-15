<?php

namespace Pronto\MobileBundle\Utils;


use Exception;

class File
{
    /**
     * @param string $directory
     */
    public static function rmDir(string $directory)
    {
        $files = glob($directory . '*', GLOB_MARK);

        foreach ($files as $file) {
            if (is_dir($file)) {
                self::rmDir($file);
            } else {
                unlink($file);
            }
        }

        try {
            rmdir($directory);
        } catch(Exception $exception) {
            //
        }
    }
}