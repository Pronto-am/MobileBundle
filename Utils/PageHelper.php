<?php

namespace Pronto\MobileBundle\Utils;


use Doctrine\ORM\EntityManager;
use Doctrine\ORM\QueryBuilder;
use Exception;
use Pronto\MobileBundle\Utils\Doctrine\Clause;
use Pronto\MobileBundle\Utils\Doctrine\GroupClause;
use Pronto\MobileBundle\Utils\Doctrine\SelectClause;
use Symfony\Component\HttpFoundation\Request;

class PageHelper
{
	/** @var Request $request */
	private $request;

	/** @var \Doctrine\ORM\EntityRepository $repository */
	private $repository;

	/** @var array Clauses */
	private $clauses = [];

	/** @var string The field to sort by */
	private $sortField;

	/** @var string The direction to sort in */
	private $sortOrder;

	/** @var int Items per page */
	private $perPage;

	/** @var int The offset of the results */
	private $offset;

	/** @var int The current page */
	private $currentPage;

	/** @var int The number of total pages */
	private $totalPages;

	/** @var int The total number of records */
	private $totalRecords;

	/** @var mixed Locally cached list of results */
	private $list;

	/** @var null|string $query */
	private $query;

	/** @var string */
	private $countField;


	/**
	 * PageHelper constructor.
	 *
	 * @param Request $request
	 * @param EntityManager|\Doctrine\Common\Persistence\ObjectManager $entityManager
	 * @param $entity
	 * @param int $perPage
	 * @param string $sortField
	 * @param string $sortOrder
	 * @param string $countField
	 */
	public function __construct(Request $request, EntityManager $entityManager, string $entity, int $perPage = 15, string $sortField = 't.id', $sortOrder = 'ASC', $countField = 't.id')
	{
		$this->request = $request;
		$this->perPage = $perPage;
		$this->sortField = $request->get('sortBy') ?? $sortField;
		$this->sortOrder = strtolower($request->get('sortOrder') ?? $sortOrder);
		$this->countField = $countField;

		$this->repository = $entityManager->getRepository($entity);
	}


	/**
	 * Set the current page and total number of pages
	 */
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


	/**
	 * Create a url to sort a table by the column
	 *
	 * @param $label
	 * @param $column
	 */
	public function createSortableLink(string $label, string $column): void
	{
		$active = $this->sortField === $column;

		$url = $this->request->getPathInfo() . '?page=' . $this->currentPage . '&sortBy=' . $column . '&sortOrder=' . ($active ? ($this->sortOrder === 'asc' ? 'desc' : 'asc') : 'asc');

		echo '<a href="' . $url . '" class="column-sortable ' . ($active ? 'column-active' : '') . '">' . $label . ' <i class="fa fa-caret-' . ($active ? ($this->sortOrder === 'asc' ? 'up' : 'down') : 'up') . '" aria-hidden="true"></i></a>';
	}


	/**
	 * Get the row number of the current record
	 *
	 * @param $key
	 * @return int
	 */
	public function getRowNumber(int $key): int
	{
		return (($this->currentPage - 1) * $this->perPage) + $key + 1;
	}


	/**
	 * @return string
	 */
	public function getSortField(): string
	{
		return $this->sortField;
	}


	/**
	 * @return string
	 */
	public function getSortOrder(): string
	{
		return $this->sortOrder;
	}


	/**
	 * Get the total number of records
	 *
	 * @return mixed
	 */
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


	/**
	 * Add a clause to the query
	 *
	 * @param Clause $clause
	 */
	public function addClause(Clause $clause): void
	{
		$this->clauses[] = $clause;
	}


	/**
	 * Add all clauses to the query
	 *
	 * @param QueryBuilder $query
	 * @param bool $withoutSelect
	 */
	private function addClausesToQuery(&$query, bool $withoutSelect = false): void
	{
		foreach ($this->clauses as $clause) {
			if ($withoutSelect && ($clause instanceof SelectClause || $clause instanceof GroupClause)) {
				continue;
			}

			$clause->addToQuery($query);
		}
	}


	/**
	 * Generate the base query for one or more results
	 *
	 * @return \Doctrine\ORM\QueryBuilder
	 */
	private function generateQuery(): QueryBuilder
	{
		$query = $this->repository->createQueryBuilder('t');

		$this->addClausesToQuery($query);

		$query->orderBy($this->sortField, $this->sortOrder);

		return $query;
	}


	/**
	 * Get a list of results
	 *
	 * @return array
	 */
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


	/**
	 * Create the pagination links
	 *
	 * @return string
	 */
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


	/**
	 * Create a single page button
	 *
	 * @param $pagination
	 * @param $counter
	 */
	private function createSinglePageButton(&$pagination, int $counter): void
	{
		if ($counter === $this->currentPage) {
			$pagination .= '<li class="active"><a href="#!">' . $counter . '</a></li>';
		} else {
			$pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink($counter) . '">' . $counter . '</a></li>';
		}
	}


	/**
	 * Add the starting pages with ellipsis
	 *
	 * @param $pagination
	 */
	private function addStartingEllipsis(&$pagination): void
	{
		$pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink(1) . '">1</a></li>';
		$pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink(2) . '">2</a></li>';
		$pagination .= '<li class="disabled"><a href="#!">...</a></li>';
	}


	/**
	 * Add the ending pages with ellipsis
	 *
	 * @param $pagination
	 */
	private function addEndingEllipsis(&$pagination): void
	{
		$pagination .= '<li class="disabled"><a href="#!">...</a></li>';
		$pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink($this->totalPages - 1) . '">' . ($this->totalPages - 1) . '</a></li>';
		$pagination .= '<li class="waves-effect"><a href="' . $this->createPageLink($this->totalPages) . '">' . $this->totalPages . '</a></li>';
	}


	/**
	 * Generate the url with the query parameters
	 *
	 * @param $page
	 * @return string
	 */
	private function createPageLink(int $page): string
	{
		$queryString = str_replace('page=' . $this->currentPage, '', $this->request->getQueryString());

		return $this->request->getPathInfo() . '?page=' . $page . '&' . $queryString;
	}
}