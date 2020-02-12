<?php


namespace Pronto\MobileBundle\Repository;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping;
use Exception;
use Pronto\MobileBundle\Exception\ApiException;

class EntityRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * @param mixed $id
     * @return object|null
     * @throws Exception
     */
    public function findOrFail($id)
    {
        $result = $this->find($id);

        if($result === null) {
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

        if($result === null) {
            throw new Exception('No results found for model', 404);
        }

        return $result;
    }

    public function paginate(int $pageSize = 25) {

    }
}
