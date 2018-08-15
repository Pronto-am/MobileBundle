<?php

namespace Pronto\MobileBundle\Service\PushNotification;


use Pronto\MobileBundle\Utils\Firebase\Tokens\Client;

class ApnsTokenConverter
{
	/** @var int $numberOfTokens */
	private $numberOfTokens = 0;

	/** @var array $chunks */
	private $chunks = [];

	/** @var string $bundle */
	private $bundle;

	/** @var string $serverKey */
	private $serverKey;


	/**
	 * Set the bundle
	 *
	 * @param $bundle
	 */
	public function setBundle($bundle): void
	{
		$this->bundle = $bundle;
	}


	/**
	 * Set the devices that need token conversion
	 *
	 * @param array $devices
	 */
	public function setDevices(array $devices): void
	{
		$this->convertDevicesToTokens($devices);
	}


	/**
	 * Get the tokens from the array of devices
	 *
	 * @param array $devices
	 */
	private function convertDevicesToTokens(array $devices): void
	{
		// Convert to a single array of tokens
		$tokens = array_map(function($device) {
			return $device[] = $device['apnsToken'];
		}, $devices);

		$this->numberOfTokens = count($tokens);

		// Firebase has a limit of 100 tokens per conversion
		$this->chunks = array_chunk($tokens, 100);
	}


	/**
	 * Set the server key
	 *
	 * @param $serverKey
	 */
	public function setServerKey($serverKey): void
	{
		$this->serverKey = $serverKey;
	}


	/**
	 * Check if we can execute the request
	 *
	 * @return bool
	 */
	private function canConvert(): bool
	{
		return $this->numberOfTokens !== 0 && !empty($this->serverKey) && !empty($this->bundle);
	}


	/**
	 * Convert the tokens
	 *
	 * @return bool|array
	 */
	public function convert()
	{
		if (!$this->canConvert()) {
			return false;
		}

		$results = [];

		// Loop through the chunks of tokens
		foreach ($this->chunks as $chunk) {
			$response = $this->execute($chunk);

			// If the response didn't contain an object, return false
			if (is_bool($response) && !$response) {
				return false;
			}

			// Return the results
			$results = array_merge($results, $response->results);
		}

		return $results;
	}


	/**
	 * Execute the request
	 *
	 * @param $chunk
	 * @return mixed
	 */
	private function execute($chunk)
	{
		$client = new Client($this->serverKey);

		$client->setBody([
			'application' => $this->bundle,
			'sandbox'     => false,
			'apns_tokens' => $chunk
		]);

		return $client->send('', 'POST');
	}
}