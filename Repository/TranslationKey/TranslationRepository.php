<?php

namespace Pronto\MobileBundle\Repository\TranslationKey;

use Pronto\MobileBundle\Entity\Translation;
use Pronto\MobileBundle\Exception\MethodNotImplementedException;
use Pronto\MobileBundle\Repository\PaginateableRepository;
use Pronto\MobileBundle\Utils\Pagination\PaginationResponse;

class TranslationRepository extends PaginateableRepository
{
    /**
     * @inheritDoc
     */
    public function getEntity(): string
    {
        return Translation::class;
    }

    /**
     * @inheritDoc
     * @throws MethodNotImplementedException
     */
    public function paginate(): PaginationResponse
    {
        throw new MethodNotImplementedException();
    }
}
