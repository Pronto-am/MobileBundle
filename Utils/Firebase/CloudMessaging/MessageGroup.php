<?php

namespace Pronto\MobileBundle\Utils\Firebase\CloudMessaging;


use Exception;
use Pronto\MobileBundle\Entity\PushNotification;
use Pronto\MobileBundle\Service\PushNotification\GoogleServiceAccountLoader;

class MessageGroup
{

	/** @var PushNotification $notification */
	private $notification;

	/** @var Message $message */
	private $message;

	/** @var string $language */
	private $language;

	/** @var string $defaultLanguage */
	private $defaultLanguage;

	/** @var array $tokens */
	private $tokens;

	/** @var GoogleServiceAccountLoader $googleServiceAccountLoader */
	private $googleServiceAccountLoader;


	/**
	 * MessageGroup constructor.
	 * @param PushNotification $notification
	 * @param GoogleServiceAccountLoader $googleServiceAccountLoader
	 * @param null $language
	 * @param array $devices
	 */
	public function __construct(PushNotification $notification, GoogleServiceAccountLoader $googleServiceAccountLoader, $language = null, array $devices)
	{
		$this->notification = $notification;
		$this->language = $language;
		$this->tokens = array_column($devices, 'firebaseToken');
		$this->googleServiceAccountLoader = $googleServiceAccountLoader;

		$this->setDefaultLanguage();

		$this->setMessage();
	}


	/**
	 * Set the default language when the language is missing
	 */
	private function setDefaultLanguage(): void
	{
		$this->defaultLanguage = $this->notification->getApplication()->getDefaultLanguage();
	}


	/**
	 * Set the translated message
	 */
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
			$identifier = $this->notification->getId();
			$clickActionHtml = $this->notification->getClickActionHtml();

			try {
				$projectId = $this->googleServiceAccountLoader->fromFile()->getProjectId();
			} catch (Exception $exception) {
				// Service account json not found
				$projectId = 'pronto-staging';
			}

			$clickAction = 'https://firebasestorage.googleapis.com/v0/b/' . $projectId . '.appspot.com/o/notifications%2F' . $identifier . '%2F';
			$clickAction .= !empty($clickActionHtml[$this->language]) ? $this->language : $this->defaultLanguage;
			$clickAction .= '%2F' . $identifier . '.html?alt=media';

			$this->message->addData('clickAction', $clickAction);
		}

		// Set the triggers for the statistics
		$this->message->addData('notificationIdentifier', $this->notification->getId());

		// Add channel id for android
		$this->message->addData('android_channel_id', 'CHANNEL_ID_DEFAULT');
	}


	/**
	 * Get the translation of a property
	 *
	 * @param array $json
	 * @return string
	 */
	private function getTranslation(array $json): string
	{
		if ($this->language !== null && isset($json[$this->language]) && !empty($json[$this->language])) {
			return $json[$this->language];
		}

		if (isset($json[$this->defaultLanguage])) {
			return $json[$this->defaultLanguage];
		}
	}


	/**
	 * @return Message
	 */
	public function getMessage(): Message
	{
		return $this->message;
	}


	/**
	 * @return array
	 */
	public function getTokens(): array
	{
		return $this->tokens;
	}

}