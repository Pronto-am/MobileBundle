<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api;

use Doctrine\ORM\EntityManagerInterface;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Exceptions\AppVersions\FileNotFoundException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationHeaderException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidAuthorizationTokenException;
use Pronto\MobileBundle\Exceptions\Auth\InvalidPluginStateException;
use Pronto\MobileBundle\Repository\CollectionRepository;
use Pronto\MobileBundle\Service\FileManager;
use Pronto\MobileBundle\Service\ProntoMobile;
use Pronto\MobileBundle\Service\TokenInspectionService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class FileController extends BaseApiController
{
    private FileManager $fileManager;

    public function __construct(
        ProntoMobile $prontoMobile,
        TokenInspectionService $tokenInspectionService,
        EntityManagerInterface $entityManager,
        FileManager $fileManager
    ) {
        parent::__construct($prontoMobile, $tokenInspectionService);
        $this->fileManager = $fileManager;
        $this->entityManager = $entityManager;
    }

    /**
     * @throws InvalidAuthorizationHeaderException
     * @throws InvalidAuthorizationTokenException
     * @throws InvalidPluginStateException
     * @throws FileNotFoundException
     */
    public function download(string $path): BinaryFileResponse
    {
        $this->validateAuthorization();

        if (preg_match('/^collections\/.+$/', $path) === 1) {
            return $this->downloadEntryFile($path);
        }

        throw new FileNotFoundException();
    }

    /**
     * @throws FileNotFoundException
     */
    private function downloadEntryFile(string $path): BinaryFileResponse
    {
        // Validate that the ID of the collection belongs to the application
        [, $collectionId] = explode('/', $path);

        /** @var CollectionRepository $collectionRepository */
        $collectionRepository = $this->entityManager->getRepository(Collection::class);
        $collection = $collectionRepository->findByApplication($this->prontoMobile->getApplication(), $collectionId);

        if ($collection === null) {
            throw new AccessDeniedException();
        }

        $file = $this->fileManager->get($path);
        if ($file === null) {
            throw new FileNotFoundException();
        }

        return new BinaryFileResponse($file->getRealPath());
    }
}
