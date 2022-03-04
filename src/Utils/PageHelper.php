<?php

namespace Pronto\MobileBundle\Utils;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Exception;
use Pronto\MobileBundle\Utils\Doctrine\Clause;
use Pronto\MobileBundle\Utils\Doctrine\GroupClause;
use Pronto\MobileBundle\Utils\Doctrine\SelectClause;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class PageHelper
 * @package Pronto\MobileBundle\Utils
 */
class PageHelper
{
    private Request $request;
    private EntityRepository $repository;
    private array $clauses = [];
    private string $sortField;
    private string $sortOrder;
    private int $perPage;
    private int $offset;
    private int $currentPage;
    private int $totalPages;
    private int $totalRecords;
    private ?array $list;
    private ?string $query;
    private string $countField;

    public function __construct(
        Request $request,
        EntityManager $entityManager,
        string $entity,
        int $perPage = 15,
        string $sortField = 't.id',
        string $sortOrder = 'ASC',
        string $countField = 't.id'
    ) {
        $this->request = $request;
        $this->perPage = $perPage;
        $this->sortField = $request->get('sortBy') ?? $sortField;
        $this->sortOrder = strtolower($request->get('sortOrder') ?? $sortOrder);
        $this->countField = $countField;

        $this->repository = $entityManager->getRepository($entity);
    }

    public function createSortableLink(string $label, string $column): void
    {
        $active = $this->sortField === $column;

        $url = $this->request->getPathInfo() . '?page=' . $this->currentPage . '&sortBy=' . $column . '&sortOrder=' . ($active ? ($this->sortOrder === 'asc' ? 'desc' : 'asc') : 'asc');

        echo '<a href="' . $url . '" class="column-sortable ' . ($active ? 'column-active' : '') . '">' . $label . ' <i class="fa fa-caret-' . ($active ? ($this->sortOrder === 'asc' ? 'up' : 'down') : 'up') . '" aria-hidden="true"></i></a>';
    }

    public function getRowNumber(int $key): int
    {
        return (($this->currentPage - 1) * $this->perPage) + $key + 1;
    }

    public function getSortField(): string
    {
        return $this->sortField;
    }

    public function getSortOrder(): string
    {
        return $this->sortOrder;
    }

    public function addClause(Clause $clause): void
    {
        $this->clauses[] = $clause;
    }

    public function getList(): array
    {
        // Prevent the query from being executed multiple times
        if ($this->list !== null) {
            return $this->list;
        }

        $this->setTotalRecords();

        $this->setCurrentPage();

        $query = $this->generateQuery();

        $query->setFirstResult($this->offset);
        $query->setMaxResults($this->perPage);

        $this->list = $query->getQuery()->execute();

        return $this->list;
    }

    private function setTotalRecords()
    {
        if ($this->query === null) {
            $this->query = $this->repository
                ->createQueryBuilder('t')
                ->select('count(distinct ' . $this->countField . ')');

            $this->addClausesToQuery($this->query, true);
        }

        try {
            $this->totalRecords = $this->query->getQuery()->getSingleScalarResult();
        } catch (Exception $exception) {
            $this->totalRecords = 0;
        }
    }

    private function addClausesToQuery(&$query, bool $withoutSelect = false): void
    {
        foreach ($this->clauses as $clause) {
            if ($withoutSelect && ($clause instanceof SelectClause || $clause instanceof GroupClause)) {
                continue;
            }

            $clause->addToQuery($query);
        }
    }

    private function setCurrentPage(): void
    {
        $this->currentPage = $this->request->get('page', 1);
        $this->totalPages = ceil($this->totalRecords / $this->perPage);

        if (($this->currentPage * $this->perPage) > $this->totalRecords) {
            $this->currentPage = $this->totalPages;
        }

        // Offset for db table
        if ($this->currentPage > 1) {
            $this->offset = ($this->currentPage - 1) * $this->perPage;
        } else {
            $this->offset = 0;
        }
    }

    private function generateQuery(): QueryBuilder
    {
        $query = $this->repository->createQueryBuilder('t');

        $this->addClausesToQuery($query);

        $query->orderBy($this->sortField, $this->sortOrder);

        return $query;
    }

    public function createPaginationLinks(): string
    {
        $adjacents = 1;

        $pagination = '';

        if ($this->totalPages > 1) {
            $pagination .= '<ul class="pagination">';

            // Previous button
            if ($this->currentPage > 1) {
                $pagination .= '<li><a href="' . $this->createPageLink($this->currentPage - 1) . '"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
            } else {
                $pagination .= '<li class="disabled"><a href="#!"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
            }

            // Pages
            if ($this->totalPages < 7 + ($adjacents * 2)) {
                for ($counter = 1; $counter <= $this->totalPages; $counter++) {
                    $this->createSinglePageButton($pagination, $counter);
                }
            } else if ($this->totalPages >= 7 + ($adjacents * 2)) {
                // Close to beginning; only hide later pages
                if ($this->currentPage < 1 + ($adjacents * 3)) {
                    for ($counter = 1; $counter < 4 + ($adjacents * 2); $counter++) {
                        $this->createSinglePageButton($pagination, $counter);
                    }

                    $this->addEndingEllipsis($pagination);
                } elseif ($this->totalPages - ($adjacents * 2) > $this->currentPage && $this->currentPage > ($adjacents * 2)) {
                    $this->addStartingEllipsis($pagination);

                    for ($counter = $this->currentPage - $adjacents; $counter <= $this->currentPage + $adjacents; $counter++) {
                        $this->createSinglePageButton($pagination, $counter);
                    }

                    $this->addEndingEllipsis($pagination);
                } //close to end; only hide early pages
                else {
                    $this->addStartingEllipsis($pagination);

                    for ($counter = $this->totalPages - (1 + ($adjacents * 3)); $counter <= $this->totalPages; $counter++) {
                        $this->createSinglePageButton($pagination, $counter);
                    }
                }
            }

            if ($this->currentPage < $counter - 1) {
                $pagination .= '<li><a href="' . $this->createPageLink($this->currentPage + 1) . '"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
            } else {
                $pagination .= '<li class="disabled"><a href="#!"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
            }

            $pagination .= '</ul>';
        }

        return $pagination;
    }

    private function createPageLink(int $page): string
    {
        $queryString = str_replace('page=' . $this->currentPage, '', $this->request->getQueryString());

        return $this->request->getPathInfo() . '?page=' . $page . '&' . $queryString;
    }

    private function createSinglePageButton(&$pagination, int $counter): void
    {
        if ($counter === $this->currentPage) {
            $pagination .= '<li class="active"><a href="#!">' . $counter . '</a></li>';
        } else {
            $pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink($counter) . '">' . $counter . '</a></li>';
        }
    }

    private function addEndingEllipsis(&$pagination): void
    {
        $pagination .= '<li class="disabled"><a href="#!">...</a></li>';
        $pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink($this->totalPages - 1) . '">' . ($this->totalPages - 1) . '</a></li>';
        $pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink($this->totalPages) . '">' . $this->totalPages . '</a></li>';
    }

    private function addStartingEllipsis(&$pagination): void
    {
        $pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink(1) . '">1</a></li>';
        $pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink(2) . '">2</a></li>';
        $pagination .= '<li class="disabled"><a href="#!">...</a></li>';
    }
}
