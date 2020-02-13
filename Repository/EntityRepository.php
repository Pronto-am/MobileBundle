<?php


namespace Pronto\MobileBundle\Repository;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Exception;

abstract class EntityRepository
{
    /**
     * @var EntityManagerInterface $entityManager
     */
    protected $entityManager;

    /**
     * @var \Doctrine\ORM\EntityRepository
     */
    protected $repository;

    /**
     * EntityRepository constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $entityManager->getRepository($this->getEntity());
    }

    /**
     * @return string Classname
     */
    abstract public function getEntity(): string;

    /**
     * @param mixed $id
     * @return object|null
     * @throws Exception
     */
    public function findOrFail($id)
    {
        $result = $this->find($id);

        if ($result === null) {
            throw new Exception('No results found for model', 404);
        }

        return $result;
    }

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @return object|null
     * @throws Exception
     */
    public function firstOrFail(array $criteria, ?array $orderBy = null)
    {
        $result = $this->findOneBy($criteria, $orderBy);

        if ($result === null) {
            throw new Exception('No results found for model', 404);
        }

        return $result;
    }

    /**
     * @return array|object[]
     */
    public function findAll()
    {
        return $this->repository->findAll();
    }

    /**
     * @param $id
     * @return object|null
     */
    public function find($id)
    {
        return $this->repository->find($id);
    }

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @param null $limit
     * @param null $offset
     * @return array|object[]
     */
    public function findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
    {
        return $this->repository->findBy($criteria, $orderBy, $limit, $offset);
    }

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @return object|null
     */
    public function findOneBy(array $criteria, ?array $orderBy = null)
    {
        return $this->repository->findOneBy($criteria, $orderBy);
    }

    /**
     * @param $alias
     * @param null $indexBy
     * @return QueryBuilder
     */
    public function createQueryBuilder($alias, $indexBy = null)
    {
        return $this->repository->createQueryBuilder($alias, $indexBy);
    }

    /**
     * @param $entity
     * @param bool $flush
     */
    public function save($entity, bool $flush = true)
    {
        $this->entityManager->persist($entity);

        if ($flush) {
            $this->entityManager->flush();
        }
    }
}
