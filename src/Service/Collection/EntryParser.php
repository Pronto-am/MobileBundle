<?php

namespace Pronto\MobileBundle\Service\Collection;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Pronto\MobileBundle\Entity\Collection;
use Pronto\MobileBundle\Entity\Customer;
use Pronto\MobileBundle\Entity\User;
use Pronto\MobileBundle\Utils\Collect;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use function in_array;

class EntryParser
{
    // Dates to be parsed
    public const DATES = ['created_at', 'updated_at'];

    // User id's need to be converted to user objects
    public const USER_PROPERTIES = ['created_by_id', 'updated_by_id'];

    // These properties need json decoding
    public const JSON = ['json', 'coordinates', 'file'];

    /** @var EntityManagerInterface $entityManager */
    private $entityManager;

    /** @var Collection $collection */
    private $collection;

    /** @var array $users */
    private $users;

    /** @var array $properties */
    private $properties;

    /** @var UrlGeneratorInterface $urlGenerator */
    private $urlGenerator;

    public function __construct(EntityManagerInterface $entityManager, UrlGeneratorInterface $urlGenerator)
    {
        $this->entityManager = $entityManager;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * Set the collection for which entries need parsing
     */
    public function setCollection(Collection $collection): void
    {
        $this->collection = $collection;

        // Map the properties of the base collection
        $this->mapProperties($this->collection);

        $this->setUsers();
    }

    /**
     * Map the properties to a readable format
     */
    private function mapProperties(Collection $collection): void
    {
        // Create a properties array of this relationship
        $this->properties = Collect::keyBy($collection->getProperties()->getValues(), 'identifier');
    }

    /**
     * Get the users from the database and store them locally
     */
    private function setUsers(): void
    {
        // They only need to be loaded once
        if (!empty($this->users)) {
            return;
        }

        /** @var Customer $customer */
        $customer = $this->collection->getApplicationVersion()->getApplication()->getCustomer();

        // Get the users for the created_at and updated_at attributes
        $userRepository = $this->entityManager->getRepository(User::class);

        $this->users = $userRepository->findAllByCustomer($customer, true, [
            'user.id',
            'user.firstName AS first_name',
            'user.insertion',
            'user.lastName AS last_name',
            'CASE WHEN (user.insertion IS NULL OR user.insertion = \'\') THEN CONCAT(user.firstName, \' \', user.lastName) ELSE CONCAT(user.firstName, \' \', user.insertion, \' \', user.lastName) END AS full_name',
            'user.createdAt AS created_at',
            'user.updatedAt AS updated_at',
        ]);

        // Map the users array so that the ID is key
        $this->users = Collect::keyBy($this->users, 'id');
    }

    /**
     * Parse the entries to the correct format to return as an API response
     */
    public function parse(array $entries, array $mappedRelationships = []): array
    {
        $this->parseEntries($entries, $mappedRelationships);

        return $entries;
    }

    /**
     * Parse the entries
     */
    private function parseEntries(array &$entries, array $mappedRelationships): void
    {
        // Parse the entry
        foreach ($entries as &$entry) {
            $this->parseEntry($entry, $mappedRelationships);
        }
    }

    /**
     * Parse an entry to the correct format
     * @throws Exception
     */
    private function parseEntry(array &$entry, array $mappedRelationships): void
    {
        // Remove the data object, because we only needed it to perform a HAVING search on it
        unset($entry['data']);

        foreach ($entry as $key => &$value) {
            // Only properties inside the data object are in the types array, not the ID for example
            if (!isset($this->properties[$key])) {
                continue;
            }

            /** @var Collection\Property $property */
            $property = $this->properties[$key];
            $type = $property->getType();

            // JSON encoding collection property types
            if ($property->isTranslatable() || in_array($type->getType(), self::JSON, true)) {
                $value = json_decode($value, true);
            }

            // Cast the values to the correct format
            $this->performTypeCasting($type, $value);
        }

        // Prevent any problems with looped $value variable
        unset($value);

        // Parse the dates as ISO strings
        foreach (self::DATES as $date) {
            $dateTime = $entry[$date] instanceof DateTime ? $entry[$date] : new DateTime($entry[$date]);

            $entry[$date] = $dateTime->format(DateTime::ATOM);
        }

        // Update the user id's to become user objects
        foreach (self::USER_PROPERTIES as $id) {
            // Create a key without _id suffix
            $key = str_replace('_id', '', $id);

            // Create the new property with user object
            $entry[$key] = $this->users[$entry[$id]] ?? null;

            // No need to perform more actions when the user is NULL
            if ($entry[$key] !== null) {
                // Parse the users' dates
                foreach (self::DATES as $date) {
                    /** @var DateTime $dateTime */
                    $dateTime = $entry[$key][$date];

                    $entry[$key][$date] = $dateTime !== null ? $dateTime->format(DateTime::ATOM) : null;
                }
            }

            // Unset the old value
            unset($entry[$id]);
        }

        // Insert the relationships
        $this->mapRelationships($mappedRelationships, $entry);
    }

    /**
     * Perform the type casting for the values
     */
    private function performTypeCasting(Collection\Property\Type $propertyType, &$value): void
    {
        // Additional type casting
        switch ($propertyType->getType()) {
            case 'coordinates':
                $value['latitude'] = (float) $value['latitude'];
                $value['longitude'] = (float) $value['longitude'];
                break;
            case 'dateTime':
                try {
                    $value = new DateTime($value);
                    $value = $value->format(DateTime::ATOM);
                } catch (Exception $exception) {
                    $value = null;
                }

                break;
            case 'boolean':
                $value = $value === 'true';
                break;
            case 'number':
                $value = (float) $value;
                break;
            case 'file':
                $value = array_map(function (string $fileName) {
                    $relativePath = sprintf('/collections/%s/%s', $this->collection->getId(), $fileName);

                    return [
                        'file_name'    => $fileName,
                        'file_path'    => $relativePath,
                        'absolute_url' => $this->urlGenerator->generate(
                            'pronto_mobile_api_file_download',
                            ['path' => ltrim($relativePath, '/')],
                            UrlGeneratorInterface::ABSOLUTE_URL
                        ),
                    ];
                }, $value);
        }
    }

    /**
     * Add the relationships to the entry
     */
    private function mapRelationships(array $mappedRelationships, &$entry): void
    {
        if (!empty($mappedRelationships)) {
            /** @var Collection\Relationship $relationship */
            foreach ($this->collection->getRelationships() as $relationship) {
                $identifier = $relationship->getIdentifier();

                // The relationship may not be set when it shouldn't be shown in the listview response
                if (!isset($mappedRelationships[$entry['id']][$identifier])) {
                    continue;
                }

                $related = array_values($mappedRelationships[$entry['id']][$identifier]);

                // Return only one record when it's a one to one relationship
                if (!$relationship->getType()->hasMany()) {
                    $related = $related[0] ?? null;
                }

                $entry[$identifier] = $related;
            }
        }
    }
}
