<?php

namespace Pronto\MobileBundle\Serializer;

use DateTime;
use Pronto\MobileBundle\Entity\RemoteConfig;
use Pronto\MobileBundle\Enum\RemoteConfigType;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class RemoteConfigNormalizer implements NormalizerInterface
{
    public function normalize($object, $format = null, array $context = []): array
    {
        /** @var RemoteConfig $object */
        $data = [
            'id'           => $object->getId(),
            'release_date' => $object->getReleaseDate()?->format(DateTime::ATOM),
            'android'      => $object->isAndroid(),
            'ios'          => $object->isIos(),
            'name'         => $object->getName(),
            'identifier'   => $object->getIdentifier(),
            'description'  => $object->getDescription(),
            'value'        => $object->getValue(),
            'created_at'   => $object->getCreatedAt()->format(DateTime::ATOM),
            'updated_at'   => $object->getUpdatedAt()->format(DateTime::ATOM),
        ];

        if ($object->getType()->equals(RemoteConfigType::INTEGER())) {
            $data['value'] = (float)$data['value'];
        } else if ($object->getType()->equals(RemoteConfigType::BOOL())) {
            $data['value'] = $data['value'] === 1;
        } else if ($object->getType()->equals(RemoteConfigType::JSON()) || $object->getType()->equals(RemoteConfigType::ENUM())) {
            $data['value'] = $object->getJsonValue();
        }

        $data['type'] = $object->getType()->getValue();

        return $data;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            RemoteConfig::class => true,
        ];
    }

    public function supportsNormalization($data, $format = null, array $context = []): bool
    {
        return $data instanceof RemoteConfig;
    }
}
