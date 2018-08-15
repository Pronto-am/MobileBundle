<?php

namespace Pronto\MobileBundle\Service;


use Awps\FontAwesome;

class FontAwesomeLoader
{

	private $icons;

	/**
	 * FontAwesomeLoader constructor.
	 */
	public function __construct()
	{
		$this->icons = new FontAwesome();
	}


	/**
	 * Get the array of icon class as key and unicode as value
	 *
	 * @return array|bool
	 */
	public function getArray() {
		return $this->icons->getArray();
	}


	/**
	 * Get all of the icon data, readable name, unicode character and class
	 *
	 * @return array|bool
	 */
	public function getAllData() {
		return $this->icons->getAllData();
	}


	/**
	 * Get readable names and classes of the icons
	 *
	 * @return array|bool
	 */
	public function getReadableNames() {
		return $this->icons->getReadableNames();
	}


	/**
	 * Sort the array by icon name
	 *
	 * @return array|bool
	 */
	public function sortArrayByName() {
		return $this->icons->sortByName();
	}


	/**
	 * Reset the sorted array to its' original value
	 *
	 * @return array|bool
	 */
	public function resetArrayOrder() {
		$this->icons->reset();

		return $this->getArray();
	}
}