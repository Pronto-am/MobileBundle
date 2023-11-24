<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

use Kreait\Firebase\Messaging\AndroidConfig;
use Kreait\Firebase\Messaging\ApnsConfig;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Service\PushNotification\FirebaseStorage;

class MessageGroup
{
    readonly CloudMessage $message;
    private string $defaultLanguage;
    private array $tokens;

    public function __construct(
        private readonly PushNotification $notification,
        private readonly FirebaseStorage $firebaseStorage,
        array $devices,
        private $language = null,
    ) {
        $this->tokens = array_column($devices, 'firebaseToken');

        $this->setDefaultLanguage();
        $this->setMessage();
    }

    private function setDefaultLanguage(): void
    {
        $this->defaultLanguage = $this->notification->getApplication()->getDefaultLanguage();
    }

    private function setMessage(): void
    {
        $notification = Notification::fromArray([
            'title' => $this->getTranslation($this->notification->getTitle()),
            'body'  => $this->getTranslation($this->notification->getContent()),
        ]);

        $data = [
            // Set the triggers for the statistics
            'notificationIdentifier' => $this->notification->getId(),
            // Add channel id for android
            'android_channel_id'     => 'CHANNEL_ID_DEFAULT',
        ];

        // Add a click action url if it's set
        if ($this->notification->getClickAction() === PushNotification::TYPE_URL_ACTION) {
            $clickAction = $this->notification->getClickActionUrl();

            $clickAction = !empty($clickAction[$this->language]) ? $clickAction[$this->language] : $clickAction[$this->defaultLanguage];

            $data['clickAction'] = $clickAction;
        } elseif ($this->notification->getClickAction() === PushNotification::TYPE_HTML_ACTION) {

            $language = $this->language ?? $this->defaultLanguage;
            $data['clickAction'] = $this->firebaseStorage->generateUrlForPushNotification($this->notification, $language);
        }

        $this->message = CloudMessage::new()
            ->withNotification($notification)
            ->withAndroidConfig(AndroidConfig::fromArray([
                'ttl'      => '3600s',
                'priority' => 'high',

            ]))
            ->withApnsConfig(ApnsConfig::fromArray([
                'headers' => [
                    'apns-priority' => '10',
                ],
            ]))
            ->withData($data);
    }

    private function getTranslation(array $json): string
    {
        if ($this->language !== null && isset($json[$this->language]) && !empty($json[$this->language])) {
            return $json[$this->language];
        }

        if (isset($json[$this->defaultLanguage])) {
            return $json[$this->defaultLanguage];
        }

        return '';
    }

    public function getTokens(): array
    {
        return $this->tokens;
    }

}
