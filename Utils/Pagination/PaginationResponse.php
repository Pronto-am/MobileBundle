<?php


namespace Pronto\MobileBundle\Utils\Pagination;


class PaginationResponse
{
    /**
     * @var mixed $data
     */
    private $data;

    /**
     * @var array $meta
     */
    private $meta;

    /**
     * @var array $normalizers
     */
    private $normalizers;

    /**
     * PaginationResponse constructor.
     * @param $data
     * @param array $meta
     */
    public function __construct($data, array $meta)
    {
        $this->data = $data;
        $this->meta = $meta;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @return array
     */
    public function getLinks(): array
    {
        return [
            'first' => '?page=1',
            'last'  => '?page=2',
            'prev'  => '?page=1',
            'next'  => '?page=2',
        ];
    }

    /**
     * @return array
     */
    public function getMeta(): array
    {
        return $this->meta;
    }

    /**
     * @param array $normalizers
     */
    public function withNormalizers(array $normalizers)
    {
        $this->normalizers = $normalizers;
    }

    /**
     * @return array
     */
    public function getNormalizers(): array
    {
        return $this->normalizers ?? [];
    }
}
