<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Service\PushNotification\FirebaseStorage;

class MessageGroup
{
    private PushNotification $notification;
    private Message $message;
    private ?string $language;
    private string $defaultLanguage;
    private array $tokens;
    private FirebaseStorage $firebaseStorage;

    public function __construct(PushNotification $notification, FirebaseStorage $firebaseStorage, array $devices, string $language = null)
    {
        $this->notification = $notification;
        $this->language = $language;
        $this->tokens = array_column($devices, 'firebaseToken');
        $this->firebaseStorage = $firebaseStorage;

        $this->setDefaultLanguage();
        $this->setMessage();
    }

    private function setDefaultLanguage(): void
    {
        $this->defaultLanguage = $this->notification->getApplication()->getDefaultLanguage();
    }

    private function setMessage(): void
    {
        $this->message = new Message();
        $this->message->setTitle($this->getTranslation($this->notification->getTitle()));
        $this->message->setContent($this->getTranslation($this->notification->getContent()));

        // Add a click action url if it's set
        if ($this->notification->getClickAction() === PushNotification::TYPE_URL_ACTION) {
            $clickAction = $this->notification->getClickActionUrl();

            $clickAction = !empty($clickAction[$this->language]) ? $clickAction[$this->language] : $clickAction[$this->defaultLanguage];

            $this->message->addData('clickAction', $clickAction);
        } elseif ($this->notification->getClickAction() === PushNotification::TYPE_HTML_ACTION) {

            $language = $this->language ?? $this->defaultLanguage;
            $this->message->addData('clickAction', $this->firebaseStorage->generateUrlForPushNotification($this->notification, $language));
        }

        // Set the triggers for the statistics
        $this->message->addData('notificationIdentifier', $this->notification->getId());

        // Add channel id for android
        $this->message->addData('android_channel_id', 'CHANNEL_ID_DEFAULT');
    }

    private function getTranslation(array $json): string
    {
        if ($this->language !== null && isset($json[$this->language]) && !empty($json[$this->language])) {
            return $json[$this->language];
        }

        if (isset($json[$this->defaultLanguage])) {
            return $json[$this->defaultLanguage];
        }
    }

    public function getMessage(): Message
    {
        return $this->message;
    }

    public function getTokens(): array
    {
        return $this->tokens;
    }

}
