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
