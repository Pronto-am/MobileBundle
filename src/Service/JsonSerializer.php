<?php

namespace Pronto\MobileBundle\Service;

use Exception;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AttributeLoader;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class JsonSerializer
{
    private ClassMetadataFactory $classMetadataFactory;

    public function __construct()
    {
        $this->classMetadataFactory = new ClassMetadataFactory(
            new AttributeLoader()
        );
    }

    public function serialize($entity, array $normalizers = [], array $groups = [], bool $snakeCasedProperties = true): string
    {
        $callbacks = [];

        // Set property callbacks
        if ($entity instanceof ApiEntityInterface) {
            $callbacks = $entity::getSerializerCallbacks();
        }

        $defaultContext = [
            AbstractNormalizer::CALLBACKS => $callbacks,
        ];

        $nameConverter = $snakeCasedProperties ? new CamelCaseToSnakeCaseNameConverter() : null;

        // conversion of property names to snake_case instead of CamelCase
        $objectNormalizer = new ObjectNormalizer(
            $this->classMetadataFactory,
            $nameConverter,
            null,
            null,
            null,
            null,
            $defaultContext
        );

        $normalizers[] = $objectNormalizer;

        $serializer = new Serializer($normalizers, [new JsonEncoder()]);

        $this->setGroups($entity, $groups);

        return $serializer->serialize($entity, 'json', [
            'groups' => $groups
        ]);
    }

    private function setGroups($entity, array &$groups): void
    {
        // Get the full class namespace
        $className = $this->getClassName($entity);

        // Add the default entity groups
        if ($className !== null) {
            $groups[] = end($className);
        }

        $groups[] = 'TimestampedEntity';
        $groups[] = 'TimestampedWithUserEntity';
    }

    private function getClassName($entity): ?array
    {
        if (is_array($entity)) {
            if (count($entity) === 0) {
                return null;
            }

            $entity = $entity[0];
        }

        try {
            // Get the full class namespace
            return explode('\\', get_class($entity));

        } catch (Exception $exception) {
            return null;
        }
    }
}
