<?php


namespace Pronto\MobileBundle\Repository;

use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Utils\Pagination\Filters;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;
use Pronto\MobileBundle\Utils\Pagination\Sorting;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

abstract class PaginateableRepository extends EntityRepository
{
    /**
     * @var Request $request
     */
    protected $request;

    /**
     * @var ProntoMobile $prontoMobile
     */
    protected $prontoMobile;

    /**
     * @var Filters $filters
     */
    protected $filters;

    /**
     * @var Sorting $sorting
     */
    protected $sorting;

    /**
     * @required
     * @param RequestStack $requestStack
     */
    public function setRequest(RequestStack $requestStack)
    {
        $this->request = $requestStack->getCurrentRequest();

        // Setup filters and sorting
        $this->filters = new Filters($this->request);
        $this->sorting = new Sorting($this->request);
    }

    /**
     * @required
     * @param ProntoMobile $prontoMobile
     */
    public function setProntoMobile(ProntoMobile $prontoMobile)
    {
        $this->prontoMobile = $prontoMobile;
    }

    /**
     * @return PaginationResponse
     */
    abstract public function paginate(): PaginationResponse;

    /**
     * @param QueryBuilder $queryBuilder
     * @return PaginationResponse
     */
    public function paginateQuery(QueryBuilder $queryBuilder): PaginationResponse
    {
        $query = $queryBuilder->orderBy(sprintf('entity.%s', $this->sorting->column()), $this->sorting->direction())->getQuery();

        $paginator = new Paginator($query);
        $totalItems = count($paginator);
        $pageSize = $this->filters->get('page_count', 25);
        $pagesCount = ceil($totalItems / $pageSize);
        $currentPage = $this->request->get('page', 1);

        $data = $paginator->getQuery()->setFirstResult($pageSize * ($currentPage - 1))->setMaxResults($pageSize)->execute();
        $meta = [
            'current_page' => $currentPage,
            'from'         => $pageSize * $currentPage - $pageSize,
            'last_page'    => $pagesCount,
            'per_page'     => $pageSize,
            'to'           => $pageSize * $currentPage,
            'total'        => $totalItems,
        ];

        return new PaginationResponse($data, $meta);
    }

    /**
     * @return mixed
     */
    public function list()
    {
        return $this->createQueryBuilder('entity')
            ->orderBy(sprintf('entity.%s', $this->sorting->column()), $this->sorting->direction())
            ->getQuery()
            ->execute();
    }
}
