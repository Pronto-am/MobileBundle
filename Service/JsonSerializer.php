<?php

namespace Pronto\MobileBundle\Service;


use Doctrine\Common\Annotations\AnnotationReader;
use Exception;
use Pronto\MobileBundle\Entity\ApiEntityInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class JsonSerializer
{
    /**
     * @var ObjectNormalizer $objectNormalizer
     */
    private $objectNormalizer;

    /**
     * JsonSerializer constructor.
     * @throws \Doctrine\Common\Annotations\AnnotationException
     */
    public function __construct()
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $this->objectNormalizer = new ObjectNormalizer($classMetadataFactory, new CamelCaseToSnakeCaseNameConverter());
    }

    /**
     * Serialize an entity
     *
     * @param object|array $entity
     * @param array $normalizers
     * @param array $groups
     * @param bool $snakeCasedProperties
     * @return bool|float|int|string
     */
    public function serialize($entity, array $normalizers = [], array $groups = [], bool $snakeCasedProperties = true)
    {
        // Set property callbacks
        if ($entity instanceof ApiEntityInterface) {
            $this->objectNormalizer->setCallbacks($entity::getSerializerCallbacks());
        }

        $normalizers[] = $this->objectNormalizer;

        $serializer = new Serializer($normalizers, [new JsonEncoder()]);

        $this->setGroups($entity, $groups);

        return $serializer->serialize($entity, 'json', [
            'groups' => $groups
        ]);
    }

    /**
     * @param string $entity
     * @param array||string $data
     * @return array|object
     */
    public function deserialize(string $entity, $data)
    {
        $serializer = new Serializer([$this->objectNormalizer], [new JsonEncoder()]);
        $data = is_array($data) ? json_encode($data) : $data;

        return $serializer->deserialize($data, $entity, 'json');
    }

    /**
     * Set the groups of the serialization
     *
     * @param object|array $entity
     * @param array $groups
     */
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

    /**
     * Get the class name by entity or array of entities
     *
     * @param $entity
     * @return array|null
     */
    private function getClassName($entity): ?array
    {
        if (is_array($entity) && count($entity) > 0) {
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
