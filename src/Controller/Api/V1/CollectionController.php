<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Controller\Api\V1;

use Doctrine\DBAL\DBALException;
use Exception;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Exceptions\ApiException;
use Pronto\MobileBundle\Exceptions\Auth\NotAuthorizedException;
use Pronto\MobileBundle\Exceptions\Collections\NotFoundException;
use Pronto\MobileBundle\Service\Collection\Retriever;
use Symfony\Component\HttpFoundation\JsonResponse;

class CollectionController extends BaseApiController
{

    /**
     * API-docs: Get a list of entries of a collection
     *
     * @api {get} /v1/collections/:version/:identifier?offset=:offset&limit=:limit&order_by=:order_by&direction=:direction&:field=value Get collection entries
     * @apiName GetCollectionEntities
     * @apiGroup Collection
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} version       Version of the application.
     * @apiParam {String} identifier    Collection identifier.
     * @apiParam {String} [offset]      The offset to start returning entities, default = 0.
     * @apiParam {String} [limit]       Limit of the collection result, default = 25.
     * @apiParam {String} [order_by]    Order the list by entry field, default = created_at.
     * @apiParam {String} [direction]   Direction of the ordering, default = ASC.
     * @apiParam {String} [field]       Filtering the list on field / value basis.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": [
     *         {entryObject},
     *         {entryObject},
     *         {entryObject},
     *         ...
     *       ],
     *       "pagination": {
     *         "total": 153,
     *         "offset": 0,
     *         "limit": 25
     *       }
     *     }
     *
     * @apiUse OAuthAuthorizationErrors
     */

    /**
     * @throws ApiException
     */
    public function getEntriesAction(Retriever $retriever, $version, $identifier): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization();

        // Get the collection
        $collection = $this->getCollection($version, $identifier);

        // Check if the collection exists
        if ($collection === null) {
            throw new NotFoundException();
        }

        $retriever->setCollection($collection);

        return $this->paginatedResponse($retriever->getEntries(), $retriever->getPaginationInfo());
    }

    /**
     * API-docs: Get the details of a single entry
     *
     * @api {get} /v1/collections/:version/:identifier/:id Get single collection entry
     * @apiName GetCollectionEntity
     * @apiGroup Collection
     * @apiVersion 1.0.0
     *
     * @apiUse OAuthAuthorizationHeader
     *
     * @apiParam {String} version       Version of the application.
     * @apiParam {String} identifier    Collection identifier.
     * @apiParam {String} id            ID of the collection entity.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": {entryObject}
     *     }
     *
     * @apiUse OAuthAuthorizationErrors
     */

    /**
     * @throws ApiException
     */
    private function getCollection(string $version, string $identifier): Collection
    {
        $entityManager = $this->getDoctrine()->getManager();

        /** @var Application $application */
        $application = $this->prontoMobile->getApplication();

        try {
            // Try to find the right version inside the list of application versions
            [$applicationVersion] = array_filter($application->getApplicationVersions()->getValues(), function ($applicationVersion) use ($version) {
                /** @var Version $applicationVersion */
                return $applicationVersion->getName() === $version;
            });
        } catch (Exception $exception) {
            throw new NotAuthorizedException();
        }

        /** @var Collection $collection */
        $collection = $entityManager->getRepository(Collection::class)->findOneBy([
            'identifier'         => $identifier,
            'applicationVersion' => $applicationVersion
        ]);

        if ($collection === null) {
            throw new NotFoundException();
        }

        return $collection;
    }

    /**
     * @throws DBALException
     * @throws ApiException
     */
    public function getEntryAction(Retriever $retriever, $version, $identifier, $id): JsonResponse
    {
        // Validate the authorization
        $this->validateAuthorization();

        // Get the collection
        $collection = $this->getCollection($version, $identifier);

        // Check if the collection exists
        if ($collection === null) {
            throw new NotFoundException();
        }

        $retriever->setCollection($collection);

        $entry = $retriever->getEntry($id);

        if ($entry === null) {
            throw new \Pronto\MobileBundle\Exceptions\Collections\Entries\NotFoundException();
        }

        return $this->successResponse($entry);
    }
}
