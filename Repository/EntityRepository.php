<?php


namespace Pronto\MobileBundle\Repository;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Exception;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
     * @throws NotFoundHttpException
     */
    public function findOrFail($id)
    {
        $result = $this->find($id);

        if ($result === null) {
            throw new NotFoundHttpException('No results found for model');
        }

        return $result;
    }

    /**
     * @param $id
     * @return object|null
     */
    public function findOrNew($id)
    {
        if ($id === null) {
            $class = $this->getEntity();
            return new $class;
        }

        $result = $this->find($id);

        if ($result === null) {
            $class = $this->getEntity();
            return new $class;
        }

        return $result;
    }

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @return object|null
     * @throws NotFoundHttpException
     */
    public function firstOrFail(array $criteria, ?array $orderBy = null)
    {
        $result = $this->findOneBy($criteria, $orderBy);

        if ($result === null) {
            throw new NotFoundHttpException('No results found for model');
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

    /**
     * @param array $items
     */
    public function delete(array $items)
    {
        $items = $this->repository->findBy(['id' => $items]);

        foreach ($items as $item) {
            $this->entityManager->remove($item);
        }

        $this->entityManager->flush();
    }
}
