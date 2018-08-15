<?php

namespace Pronto\MobileBundle\Tests\Utils;

use Pronto\MobileBundle\Utils\Collect;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;

class CollectTest extends TestCase
{
	/**
	 * Sorting an array of objects by an inner property
	 */
	public function testSortArrayOfObjectsAlphabetically(): void
	{
		$collection = [
			[
				'name' => 'String 1'
			], [
				'name' => 'String 2'
			], [
				'name' => 'String 0'
			]
		];

		Collect::sortAlphabetically($collection, 'name');

		$sortedCollection = [
			[
				'name' => 'String 0'
			], [
				'name' => 'String 1'
			], [
				'name' => 'String 2'
			]
		];

		$this->assertEquals($sortedCollection, $collection);
	}


	/**
	 * Sorting an array of strings
	 */
	public function testSortArrayOfStringsAlphabetically(): void
	{
		$collection = ['name', 'a sentence', 'this should come last'];

		Collect::sortAlphabetically($collection);

		$sortedCollection = ['a sentence', 'name', 'this should come last'];

		$this->assertEquals($sortedCollection, $collection);
	}


	/**
	 * Test the excluding of textual keys
	 */
	public function testExcludeKeysWithTextualKeys(): void
	{
		$array = [
			'key-1' => 'text',
			'key-2' => 'text',
			'key-3' => 'text'
		];

		$newArray = Collect::excludeKeys($array, ['key-1']);

		$this->assertArrayNotHasKey('key-1', $newArray);
		$this->assertCount(2, $newArray);
	}


	/**
	 * Test the excluding of standard integer keys
	 */
	public function testExcludeKeysWithStandardKeys(): void
	{
		$array = ['text', 'text', 'text'];

		$newArray = Collect::excludeKeys($array, [1]);

		$this->assertArrayNotHasKey(1, $newArray);
		$this->assertCount(2, $newArray);
	}


	/**
	 * Get a single object from an array by inner property
	 */
	public function testGetSingleObjectByInnerProperty(): void
	{
		$collection = [
			[
				'id'   => 1,
				'name' => 'Entry one'
			], [
				'id'   => 2,
				'name' => 'Entry two'
			], [
				'id'   => 3,
				'name' => 'Entry three'
			]
		];

		$entry = Collect::getSingleObjectByInnerProperty($collection, 'id', 2);
		$nonExistingEntry = Collect::getSingleObjectByInnerProperty($collection, 'id', 4);

		$this->assertEquals([
			'id'   => 2,
			'name' => 'Entry two'
		], $entry);

		$this->assertEquals(null, $nonExistingEntry);
	}


	/**
	 * Change the array key to one of it's inner properties
	 */
	public function testChangeArrayKey(): void
	{
		$collection = [
			[
				'id'          => 1,
				'shouldBeKey' => 'first',
				'name'        => 'Entry one'
			], [
				'id'          => 2,
				'shouldBeKey' => 'two',
				'name'        => 'Entry two'
			], [
				'id'          => 3,
				'shouldBeKey' => 'three',
				'name'        => 'Entry three'
			]
		];

		$newCollection = Collect::changeArrayKey($collection, 'shouldBeKey');

		$this->assertArrayHasKey('first', $newCollection);
		$this->assertArrayNotHasKey(0, $newCollection);
	}
}