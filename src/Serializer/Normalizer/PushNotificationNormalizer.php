<?php

declare(strict_types=1);

namespace Pronto\MobileBundle\Serializer\Normalizer;

use DateTime;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Service\PushNotification\FirebaseStorage;
use Symfony\Component\Serializer\Exception\CircularReferenceException;
use Symfony\Component\Serializer\Exception\InvalidArgumentException;
use Symfony\Component\Serializer\Exception\LogicException;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;

class PushNotificationNormalizer implements ContextAwareNormalizerInterface
{
    /** @var FirebaseStorage $firebaseStorage */
    private $firebaseStorage;

    public function __construct(FirebaseStorage $firebaseStorage)
    {
        $this->firebaseStorage = $firebaseStorage;
    }

    /**
     * @throws InvalidArgumentException
     * @throws CircularReferenceException
     * @throws LogicException
     */
    public function normalize($object, $format = null, array $context = [])
    {
        /** @var PushNotification $object */
        $clickActionHtmlUrl = null;

        if (
            $object->getClickActionHtml() !== null &&
            is_array($object->getClickActionHtml())
        ) {
            $languages = array_keys($object->getClickActionHtml());
            $clickActionHtmlUrl = [];

            foreach ($languages as $language) {
                $storageUrl = $object->getClickAction() === PushNotification::TYPE_HTML_ACTION
                    ? $this->firebaseStorage->generateUrlForPushNotification($object, $language)
                    : '';

                $clickActionHtmlUrl[$language] = $storageUrl;
            }
        }

        $user = $object->getSentBy();

        return [
            'id'                    => $object->getId(),
            'sent_by'               => [
                'id'         => $user->getId(),
                'first_name' => $user->getFirstName(),
                'insertion'  => $user->getInsertion(),
                'last_name'  => $user->getLastName(),
                'full_name'  => $user->getFullName(),
            ],
            'title'                 => $object->getTitle(),
            'content'               => $object->getContent(),
            'click_action'          => $object->getClickAction(),
            'click_action_url'      => $object->getClickActionUrl(),
            'click_action_html'     => $object->getClickActionHtml(),
            'click_action_html_url' => $clickActionHtmlUrl,
            'sent'                  => $object->getSent()->format(DateTime::ISO8601),
            'test'                  => $object->getTest(),
        ];
    }

    public function supportsNormalization($data, $format = null, array $context = [])
    {
        return $data instanceof PushNotification;
    }
}
