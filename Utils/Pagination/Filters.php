<?php

namespace Pronto\MobileBundle\Utils\Pagination;

use Symfony\Component\HttpFoundation\Request;

class Filters
{
    /**
     * @var array $filters
     */
    private $filters;

    /**
     * Filter constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->filters = json_decode($request->get('filters', '[]'), true);
    }

    /**
     * @param string $key
     * @param null $default
     * @return mixed|null
     */
    public function get(string $key, $default = null)
    {
        return $this->filters[$key] ?? $default;
    }

    /**
     * @return bool
     */
    public function isSearching(): bool
    {
        return $this->get('search') !== null;
    }

    /**
     * @return mixed|null
     */
    public function searchValue()
    {
        return $this->get('search');
    }

    /**
     * @return array
     */
    public function all()
    {
        return $this->filters;
    }
}
