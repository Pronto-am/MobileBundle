<?php

if (!function_exists('abort')) {
    /**
     * @param int $statusCode
     * @param null $message
     * @return bool|mixed
     * @throws Exception
     */
    function abort(int $statusCode = 400, $message = null)
    {
        throw new \Exception($message, $statusCode);
    }
}

if (!function_exists('camel_case')) {
    /**
     * @param string $input
     * @param string $separator
     * @return string
     */
    function camel_case($input, $separator = '_')
    {
        return lcfirst(studly_case($input, $separator));
    }
}

if (!function_exists('studly_case')) {
    /**
     * @param string $input
     * @param string $separator
     * @return string
     */
    function studly_case($input, $separator = '_')
    {
        return str_replace($separator, '', ucwords($input, $separator));
    }
}
