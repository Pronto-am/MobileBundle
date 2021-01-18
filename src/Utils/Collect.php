<?php

namespace Pronto\MobileBundle\Utils;

use function is_array;

class Collect
{
    /**
     * Sort an array alphabetically
     *
     * @param array $collection
     * @param string $attributeName
     */
    public static function sortAlphabetically(array &$collection, string $attributeName = null): void
    {
        usort($collection, function ($previous, $next) use ($attributeName) {

            if ($attributeName !== null) {
                $previousAttribute = is_array($previous) ? $previous[$attributeName] : $previous->{$attributeName};
                $nextAttribute = is_array($next) ? $next[$attributeName] : $next->{$attributeName};
            } else {
                $previousAttribute = $previous;
                $nextAttribute = $next;
            }

            return strcmp($previousAttribute, $nextAttribute);
        });
    }

    /**
     * Exclude keys from an array
     *
     * @param array $collection
     * @param array $keys
     * @return array
     */
    public static function excludeKeys(array $collection, array $keys = []): array
    {
        return array_filter($collection, function ($key) use ($keys) {
            return !in_array($key, $keys);
        }, ARRAY_FILTER_USE_KEY);
    }

    /**
     * Get array value by inner value
     *
     * @param array $collection
     * @param string $key
     * @param $value
     * @return mixed|null
     */
    public static function getSingleObjectByInnerProperty(array $collection, string $key, $value)
    {
        $result = array_filter($collection, function ($object) use ($key, $value) {
            $toCompare = is_array($object) ? $object[$key] : $object->{'get' . ucfirst($key)}();

            // We are unsure of the type, so don't use precision
            return $toCompare == $value;
        });

        // Reset the array keys so we can retrieve the first element
        $result = array_values($result);

        // Return the first or null
        return $result[0] ?? null;
    }

    /**
     * Change the key of an array to one of it's inner properties
     *
     * @param array $array
     * @param string $key
     * @return array
     */
    public static function keyBy(array $array, string $key): array
    {
        return array_reduce($array, function ($result, $object) use ($key) {
            if (is_array($object)) {
                $key = $object[$key];
            } else if (method_exists($object, 'get' . ucfirst($key))) {
                $key = $object->{'get' . ucfirst($key)}();
            } else {
                $key = $object->{$key};
            }

            $result[$key] = $object;

            return $result;
        }, []);
    }
}
