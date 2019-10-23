<?php

namespace Pronto\MobileBundle\Serializer;


use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Symfony\Component\Serializer\Exception\CircularReferenceException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;

class RemoteConfigNormalizer implements ContextAwareNormalizerInterface
{
    /**
     * Normalizes an object into a set of arrays/scalars.
     *
     * @param mixed $object Object to normalize
     * @param string $format Format the normalization result will be encoded as
     * @param array $context Context options for the normalizer
     *
     * @return array|string|int|float|bool
     *
     * @throws InvalidArgumentException   Occurs when the object given is not an attempted type for the normalizer
     * @throws CircularReferenceException Occurs when the normalizer detects a circular reference when no circular
     *                                    reference handler can fix it
     * @throws LogicException             Occurs when the normalizer is not called in an expected context
     */
    public function normalize($object, $format = null, array $context = [])
    {
        /** @var RemoteConfig $object */
        $data = [
            'id'           => $object->getId(),
            'release_date' => $object->getReleaseDate() ? $object->getReleaseDate()->format(\DateTime::ISO8601) : null,
            'android'      => $object->isAndroid(),
            'ios'          => $object->isIos(),
            'name'         => $object->getName(),
            'identifier'   => $object->getIdentifier(),
            'description'  => $object->getDescription(),
            'type'         => $object->getType(),
            'value'        => $object->getValue(),
            'created_at'   => $object->getCreatedAt()->format(\DateTime::ISO8601),
            'updated_at'   => $object->getUpdatedAt()->format(\DateTime::ISO8601),
        ];

        if ($object->getType()->equals(RemoteConfigType::INTEGER())) {
            $data['value'] = (float) $data['value'];
        } else if ($object->getType()->equals(RemoteConfigType::BOOL())) {
            $data['value'] = $data['value'] === 1;
        } else if ($object->getType()->equals(RemoteConfigType::JSON()) || $object->getType()->equals(RemoteConfigType::ENUM())) {
            $data['value'] = $object->getJsonValue();
        }

        $data['type'] = $object->getType()->getValue();

        return $data;
    }

    /**
     * {@inheritdoc}
     *
     * @param array $context options that normalizers have access to
     */
    public function supportsNormalization($data, $format = null, array $context = [])
    {
        return $data instanceof RemoteConfig;
    }
}
