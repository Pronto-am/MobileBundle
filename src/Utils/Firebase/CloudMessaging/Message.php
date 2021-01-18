<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;

class Message
{
    public const PRIORITY_NORMAL = 'normal';
    public const PRIORITY_HIGH = 'high';

    /**
     * Message fields
     * @var array
     */
    private $fields;

    /**
     * Message constructor.
     */
    public function __construct()
    {
        // Set the default fields
        $this->fields = [
            'notification'      => [],
            'content_available' => true
        ];
    }

    /**
     * Set the title of the push notification
     *
     * @param $title
     */
    public function setTitle(string $title): void
    {
        $this->fields['notification']['title'] = $title;
    }

    /**
     * Set the content of the push notification
     *
     * @param $content
     */
    public function setContent(string $content): void
    {
        $this->fields['notification']['body'] = $content ?? '';
    }

    /**
     * Add a pair of data to the message
     *
     * @param string $key
     * @param string $value
     */
    public function addData(string $key, string $value): void
    {
        if (!isset($this->fields['data'])) {
            $this->fields['data'] = [];
        }

        // Data in data, to allow more structure inside the payload of the notification.
        // Firebase skips the first 'data' object and put's everything inside the payload
        $this->fields['data'][$key] = $value;
    }

    /**
     * This parameter identifies a group of messages
     * (e.g., with collapse_key: "Updates Available") that can be collapsed,
     * so that only the last message gets sent when delivery can be resumed.
     * This is intended to avoid sending too many of the same messages when the
     * device comes back online or becomes active.
     *
     * Note that there is no guarantee of the order in which messages get sent.
     *
     * Note: A maximum of 4 different collapse keys is allowed at any given time.
     * This means a FCM connection server can simultaneously store 4 different
     * send-to-sync messages per client app. If you exceed this number, there is
     * no guarantee which 4 collapse keys the FCM connection server will keep.
     *
     * For more information see: {@link https://firebase.google.com/docs/cloud-messaging/http-server-ref}
     *
     * @param string $key The Collapse Key
     */
    public function setCollapseKey(string $key): void
    {
        $this->fields['collapse_key'] = $key;
    }

    /**
     * Sets the priority of the message. Valid values are:
     * {@link Message::PRIORITY_NORMAL} and {@link Message::PRIORITY_HIGH}
     *
     * By default, messages are sent with normal priority.
     *
     * Normal priority optimises the client app's battery consumption and should
     * be used unless immediate delivery is required. For messages with normal
     * priority, the app may receive the message with unspecified delay.
     *
     * When a message is sent with high priority, it is sent immediately, and the
     * app can wake a sleeping device and open a network connection to your server.
     *
     * For more information, see {@link https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message}
     *
     * @param string $priority Message Priority
     */
    public function setPriority(string $priority): void
    {
        $this->fields['priority'] = $priority;
    }

    /**
     * This parameter specifies how long (in seconds) the message should be kept
     * in FCM storage if the device is offline. The maximum time to live
     * supported is 4 weeks, and the default value is 4 weeks.
     *
     * For more information, see {@link https://firebase.google.com/docs/cloud-messaging/concept-options#ttl}
     *
     * @param int $time Time to live
     */
    public function setTimeToLive(int $time): void
    {
        $this->fields['time_to_live'] = $time;
    }

    /**
     * Specifies the package name of the application where the registration
     * tokens must match in order to receive the message.
     *
     * @param string $packageName Restricted package name
     */
    public function setRestrictedPackageName(string $packageName): void
    {
        $this->fields['restricted_package_name'] = $packageName;
    }

    /**
     * When set to true, allows developers to test a request without actually
     * sending a message. The default value is false.
     *
     * @param bool $dryRun Dry Run ?
     */
    public function setDryRun(bool $dryRun = true): void
    {
        $this->fields['dry_run'] = $dryRun;
    }

    /**
     * Get the body of the message
     *
     * @return array
     */
    public function getFields(): array
    {
        return $this->fields;
    }
}
