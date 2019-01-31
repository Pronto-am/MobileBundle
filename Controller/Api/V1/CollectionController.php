<?php

namespace Pronto\MobileBundle\Controller\Api\V1;

use Exception;
use Pronto\MobileBundle\Controller\Api\BaseApiController;
use Pronto\MobileBundle\Entity\Application;
use Pronto\MobileBundle\Entity\Application\Version;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Collection\Entry;
use Pronto\MobileBundle\Service\Collection\Retriever;
use Symfony\Component\HttpFoundation\Request;

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
	 * @param Retriever $retriever
	 * @param $version
	 * @param $identifier
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 * @throws \Doctrine\DBAL\DBALException
	 */
	public function getEntriesAction(Retriever $retriever, $version, $identifier)
	{
		// Validate the authorization
		$this->validateAuthorization();

		// Get the collection
		$collection = $this->getCollection($version, $identifier);

		// Check if the collection exists
		if($collection === null) {
			$this->objectNotFoundResponse(Collection::class);
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
	 * @param Retriever $retriever
	 * @param $version
	 * @param $identifier
	 * @param $id
	 * @return \Symfony\Component\HttpFoundation\JsonResponse
	 * @throws \Doctrine\DBAL\DBALException
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
	 */
	public function getEntryAction(Retriever $retriever, $version, $identifier, $id)
	{
		// Validate the authorization
		$this->validateAuthorization();

		// Get the collection
		$collection = $this->getCollection($version, $identifier);

		// Check if the collection exists
		if($collection === null) {
			$this->objectNotFoundResponse(Collection::class);
		}

		$retriever->setCollection($collection);

		$entry = $retriever->getEntry($id);

		if ($entry === null) {
			$this->objectNotFoundResponse(Entry::class);
		}

		return $this->successResponse($entry);
	}


	/**
	 * Get the collection by application version and provided identifier
	 *
	 * @param string $version
	 * @param string $identifier
	 * @return Collection
	 * @throws \Pronto\MobileBundle\Exceptions\ApiException
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
			$this->notAuthorizedResponse();
		}

		/** @var Collection $collection */
		$collection = $entityManager->getRepository(Collection::class)->findOneBy([
			'identifier'         => $identifier,
			'applicationVersion' => $applicationVersion
		]);

		return $collection;
	}
}