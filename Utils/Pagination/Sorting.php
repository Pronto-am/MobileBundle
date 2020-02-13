<?php


namespace Pronto\MobileBundle\Utils\Pagination;

use Symfony\Component\HttpFoundation\Request;

class Sorting
{
    /**
     * @var array $sorting
     */
    private $sorting;

    /**
     * Filter constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->sorting = json_decode($request->get('sort', '[]'), true);
    }

    /**
     * @param string $default
     * @return string
     */
    public function column($default = 'id')
    {
        return $this->sorting['column'] ?? $default;
    }

    /**
     * @param string $default
     * @return string
     */
    public function direction($default = 'asc')
    {
        return $this->sorting['order'] ?? $default;
    }
}
